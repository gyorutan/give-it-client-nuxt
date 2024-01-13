<template>
  <button
    class="bg-zinc-800 hover:bg-opacity-80 rounded-xl py-2.5 px-5 transition"
  >
    {{ label }}
  </button>
</template>

<script setup>
defineProps(["label"]);
</script>
