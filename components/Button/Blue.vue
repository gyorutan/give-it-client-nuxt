<template>
  <button
    class="bg-blue-500 hover:bg-opacity-80 rounded-xl py-2.5 px-5 transition"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps(["label"]);
</script>
