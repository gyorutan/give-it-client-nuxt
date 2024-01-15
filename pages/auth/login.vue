<template>
  <div class="h-screen md:flex md:justify-center md:items-center">
    <div
      class="md:w-[500px] md:border md:border-zinc-700 px-[50px] py-[50px] md:rounded-md"
    >
      <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
        <div class="flex flex-col gap-4">
          <h1 class="text-3xl font-black text-center">Give it !</h1>
          <p class="text-xl text-center font-bold">로그인</p>
        </div>
        <div class="mt-4 flex flex-col gap-4">
          <div class="relative w-full">
            <label class="absolute left-3 top-2 font-bold text-sm">
              학적번호
            </label>
            <input
              v-model="studentId"
              required
              autoComplete="false"
              type="text"
              class="bg-inherit w-full pt-9 pb-2 px-3 text-lg font-bold border focus:ring-2 focus:ring-blue-500 border-zinc-700 outline-none rounded-md transition"
            />
          </div>
          <div class="relative w-full">
            <label class="absolute left-3 top-2 font-bold text-sm">
              비밀번호
            </label>
            <input
              v-model="password"
              required
              autoComplete="false"
              :type="passwordType.valueOf()"
              class="tracking-[4px] bg-inherit w-full pt-9 pb-2 px-3 text-lg font-bold border focus:ring-2 focus:ring-blue-500 border-zinc-700 outline-none rounded-md transition"
            />
            <IconOnEye
              v-if="passwordOnOff"
              @Click="handleEye"
              class="cursor-pointer absolute top-[42px] right-4 h-5 w-5"
            />
            <IconOffEye
              v-if="!passwordOnOff"
              @Click="handleEye"
              class="cursor-pointer absolute top-[42px] right-4 h-5 w-5"
            />
          </div>
          <div class="flex gap-2">
            <ButtonBlue
              v-if="!isLoading"
              type="submit"
              class="w-full font-bold"
              label="로그인"
            />
            <ButtonLoading
              v-if="isLoading"
              type="submit"
              class="w-full font-bold"
              label="로그인 진행중..."
            />
          </div>
        </div>
        <NuxtLink
          to="/auth/signup"
          class="mt-4 text-blue-500 text-center hover:underline"
          >새 계정 만들기</NuxtLink
        >
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
const { $api } = useNuxtApp();
const router = useRouter();

let studentId = ref("");
let password = ref("");
let passwordOnOff = ref(false);
let passwordType = ref("password");
let isLoading = ref(false);

const handleEye = () => {
  if (passwordOnOff.value) {
    passwordOnOff.value = false;
    passwordType.value = "password";
  } else {
    passwordOnOff.value = true;
    passwordType.value = "text";
  }
};

const handleLogin = async () => {
  try {
    isLoading.value = true;
    const loginFormdata = {
      studentId: studentId.value,
      password: password.value,
    };
    const data = await axios
      .post(`${$api}/auth/login`, { loginFormdata })
      .then((res) => res.data);

    console.log(data);

    if (data.success) {
      router.push("/");
      alert(data.message);
    } else {
      (studentId.value = ""), (password.value = "");
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("알 수 없는 오류");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style></style>
