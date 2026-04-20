const KEY_VALUE_PATTERN = /^([A-Za-z0-9_.-]+)\s*:\s*(.*)$/;

function finalizePending(node) {
  if (node && node.type === "pending") {
    setPath(node.parent, node.key, {});
    node.type = "object";
    node.value = getPath(node.parent, node.key);
  }
}

function parseScalar(rawValue) {
  const value = rawValue.trim();
  if (value === "") {
    return "";
  }

  if (value.startsWith("[") && value.endsWith("]")) {
    return splitInlineList(value.slice(1, -1)).map((item) => parseScalar(item));
  }

  if (value.includes(",") && !value.includes("://")) {
    const list = splitInlineList(value);
    if (list.length > 1) {
      return list.map((item) => parseScalar(item));
    }
  }

  if (
    (value.startsWith("\"") && value.endsWith("\"")) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  const lowered = value.toLowerCase();
  if (lowered === "true") {
    return true;
  }
  if (lowered === "false") {
    return false;
  }
  if (lowered === "null") {
    return null;
  }

  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  }

  return value;
}

function splitInlineList(value) {
  const items = [];
  let current = "";
  let depth = 0;
  let quote = "";

  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];

    if (quote) {
      current += char;
      if (char === quote && value[i - 1] !== "\\") {
        quote = "";
      }
      continue;
    }

    if (char === "'" || char === "\"") {
      quote = char;
      current += char;
      continue;
    }

    if (char === "(" || char === "[" || char === "{") {
      depth += 1;
      current += char;
      continue;
    }

    if (char === ")" || char === "]" || char === "}") {
      depth = Math.max(0, depth - 1);
      current += char;
      continue;
    }

    if (char === "," && depth === 0) {
      const text = current.trim();
      if (text) {
        items.push(text);
      }
      current = "";
      continue;
    }

    current += char;
  }

  const tail = current.trim();
  if (tail) {
    items.push(tail);
  }

  return items;
}

function setPath(target, dottedKey, value) {
  const keys = dottedKey.split(".");
  let cursor = target;

  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i];
    if (typeof cursor[key] !== "object" || cursor[key] === null || Array.isArray(cursor[key])) {
      cursor[key] = {};
    }
    cursor = cursor[key];
  }

  cursor[keys[keys.length - 1]] = value;
}

function getPath(target, dottedKey) {
  const keys = dottedKey.split(".");
  let cursor = target;

  for (const key of keys) {
    if (typeof cursor !== "object" || cursor === null) {
      return undefined;
    }
    cursor = cursor[key];
  }

  return cursor;
}

function pushChildContainer(stack, indent, parentNode, type, value) {
  const node = { indent, type, value };
  if (parentNode.type === "pending") {
    parentNode.type = type;
    parentNode.value = value;
    setPath(parentNode.parent, parentNode.key, value);
    return parentNode;
  }

  stack.push(node);
  return node;
}

function getWorkingNode(stack, indent, lineNumber) {
  while (stack.length > 0 && indent <= stack[stack.length - 1].indent) {
    const top = stack.pop();
    finalizePending(top);
  }

  const node = stack[stack.length - 1];
  if (!node) {
    throw new Error(`Invalid indentation near line ${lineNumber}`);
  }

  return node;
}

function parseInlineObject(value) {
  const match = value.match(KEY_VALUE_PATTERN);
  if (!match) {
    return parseScalar(value);
  }

  const result = {};
  setPath(result, match[1], parseScalar(match[2]));
  return result;
}

export function parseGlass(source) {
  if (typeof source !== "string") {
    throw new TypeError("parseGlass(source): source must be a string");
  }

  const root = {};
  const stack = [{ indent: -1, type: "object", value: root }];
  const lines = source.replace(/\r\n/g, "\n").split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    const originalLine = lines[index];
    const lineNumber = index + 1;
    if (originalLine.trim() === "") {
      continue;
    }

    if (/^\s*#/.test(originalLine)) {
      continue;
    }

    if (/\t/.test(originalLine)) {
      throw new Error(`Tabs are not allowed in .glass files (line ${lineNumber})`);
    }

    const indent = originalLine.match(/^ */)[0].length;
    const content = originalLine.trim();
    let node = getWorkingNode(stack, indent, lineNumber);

    if (node.type === "pending") {
      if (content.startsWith("- ")) {
        node = pushChildContainer(stack, node.indent, node, "array", []);
      } else {
        node = pushChildContainer(stack, node.indent, node, "object", {});
      }
    }

    if (content.startsWith("- ")) {
      if (node.type !== "array") {
        throw new Error(`List item found outside list context (line ${lineNumber})`);
      }

      const valuePart = content.slice(2).trim();
      if (valuePart === "") {
        const newObject = {};
        node.value.push(newObject);
        stack.push({ indent, type: "object", value: newObject });
      } else {
        const value = parseInlineObject(valuePart);
        node.value.push(value);
        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
          stack.push({ indent, type: "object", value });
        }
      }
      continue;
    }

    const match = content.match(KEY_VALUE_PATTERN);
    if (!match) {
      throw new Error(`Invalid entry "${content}" at line ${lineNumber}`);
    }

    if (node.type !== "object") {
      throw new Error(`Key-value entry found inside a list scalar context (line ${lineNumber})`);
    }

    const key = match[1];
    const valuePart = match[2];
    if (valuePart.trim() === "") {
      const pendingNode = {
        indent,
        type: "pending",
        value: null,
        parent: node.value,
        key
      };
      setPath(node.value, key, {});
      stack.push(pendingNode);
    } else {
      setPath(node.value, key, parseScalar(valuePart));
    }
  }

  while (stack.length > 0) {
    finalizePending(stack.pop());
  }

  return root;
}

export async function parseGlassFile(filePath, encoding = "utf8") {
  const { readFile } = await import("node:fs/promises");
  const source = await readFile(filePath, encoding);
  return parseGlass(source);
}
