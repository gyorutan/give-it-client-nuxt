<template>
  <div class="h-screen md:flex md:justify-center md:items-center">
    <div class="md:w-[500px] flex-col flex gap-10 p-[50px] md:p-0">
      <div class="space-y-1">
        <h1 class="md:text-6xl text-4xl font-black">Give it !</h1>
        <p class="md:text-lg text-md">주변 친구들과 물건을 주고받자 !</p>
      </div>
      <div class="flex flex-col w-full gap-4">
        <NuxtLink
          to="/auth/login"
          class="bg-blue-500 hover:bg-opacity-80 py-2.5 rounded-xl font-medium transition text-center"
          >로그인</NuxtLink
        >
        <NuxtLink
          to="/auth/signup"
          class="hover:bg-zinc-800 border border-zinc-700 py-2.5 rounded-xl font-medium transition text-center"
          >계정 만들기</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
