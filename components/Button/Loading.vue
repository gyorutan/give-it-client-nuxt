<template>
  <button
    class="bg-blue-500 bg-opacity-50 text-white text-opacity-50 rounded-xl py-2.5 px-5 transition flex justify-center gap-2 items-center"
  >
    <IconSpinner />
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps(["label"]);
</script>
