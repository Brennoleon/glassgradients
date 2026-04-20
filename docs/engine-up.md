# Engine UP

Engine UP is the `1.2.0` animation control layer.

It is additive. If you do not set `engineUp`, the old animation model keeps working through `animate.mode`, `animate.drift`, `animate.hueShift`, `speed`, and `performance`.

## Basic Usage

```glass
selector: .hero
effect: liquid
engineUp:
  enabled: true
  duration: 12s
  easing: ease-in-out
  x: 4%
  y: 2%
  scale: 1.08
  blur: 28
  brightness: 112%
```

Engine UP can control:

- animation duration
- easing
- direction
- iteration
- fill mode
- x/y movement
- scale
- rotation
- opacity
- blur
- brightness
- saturation
- contrast
- hue rotation
- explicit keyframes

## Explicit Frames

Use `frames` when you want exact animation stages.

```glass
engineUp:
  enabled: true
  duration: 16s
  frames:
    - at: 0%
      x: -2%
      y: 0%
      scale: 1.02
      blur: 18
      brightness: 102%
    - at: 50%
      x: 3%
      y: -1%
      scale: 1.1
      blur: 34
      brightness: 118%
    - at: 100%
      x: 1%
      y: 2%
      scale: 1.04
      blur: 22
      brightness: 106%
```

The parser now supports multiline objects inside arrays, so this format is valid `.glass`.

## Motion Blurrin

Motion Blurrin creates moving circular blur fields inside the same surface.

```glass
motionBlurrin:
  layers:
    - count: 6
      minSize: 40
      maxSize: 90
      speed: 0.6
      direction: right
    - count: 10
      minSize: 12
      maxSize: 36
      speed: 1.1
      direction: diagonal
  blur: 20
  openness: 0.4
  edgeFade: 0.2
```

Layer controls:

- `count`: number of circles
- `minSize`: minimum circle size in pixels
- `maxSize`: maximum circle size in pixels
- `speed`: reserved for per-layer speed metadata
- `direction`: `right`, `left`, `up`, `down`, `diagonal`, `drift`, `orbit`, or `liquid`
- `opacity`: optional layer opacity

Surface controls:

- `blur`: blur applied to the moving field
- `openness`: how open the circular areas feel
- `edgeFade`: softness of the edge fade
- `opacity`: global field opacity
- `blend`: background blend mode
- `duration`: animation duration
- `easing`: animation easing

## Performance

Engine UP and Motion Blurrin are opt-in. MER accounts for their cost when `performance: auto` is active.

For dense UI, prefer:

```glass
performance: auto
```

For fully static output:

```glass
performance: static
```

Static performance disables animation while preserving the stable CSS variables and fills.
