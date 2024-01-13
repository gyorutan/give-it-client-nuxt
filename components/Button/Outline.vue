<template>
  <button
    class="bg-zinc-900 hover:bg-zinc-800 rounded-xl py-2.5 px-5 transition border border-zinc-700"
  >
    {{ label }}
  </button>
</template>

<script setup>
defineProps(["label"]);
</script>
