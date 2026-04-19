<script setup>
import { ref } from "vue";
import { useGlassGradient } from "glassgradients/adapters/vue";

const panel = ref(null);
useGlassGradient(panel, { recipe: "panel", preset: "editor" });
</script>

<template>
  <section ref="panel">Vue panel</section>
</template>
