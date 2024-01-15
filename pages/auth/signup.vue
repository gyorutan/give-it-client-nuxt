<template>
  <div class="h-screen md:flex md:justify-center md:items-center">
    <div
      class="md:w-[500px] md:border md:border-zinc-700 px-[50px] py-[50px] md:rounded-md"
    >
      <form class="flex flex-col gap-4" @submit.prevent="handleSignup">
        <div class="flex flex-col gap-4">
          <h1 class="text-3xl font-black text-center">Give it !</h1>
          <p class="text-xl text-center font-bold">계정 만들기</p>
        </div>
        <div
          v-if="screenNumber.valueOf() === 1"
          class="mt-4 flex flex-col gap-4"
        >
          <div class="relative w-full">
            <label class="absolute left-3 top-2 font-bold text-sm">
              이름
            </label>
            <input
              v-model="name"
              required
              autoComplete="false"
              type="text"
              class="bg-inherit w-full pt-9 pb-2 px-3 text-lg font-bold border focus:ring-2 focus:ring-blue-500 border-zinc-700 outline-none rounded-md transition"
            />
          </div>
          <div class="relative w-full">
            <label class="absolute left-3 top-2 font-bold text-sm">
              유저네임
            </label>
            <span
              v-if="usernameCheck.valueOf() === `invalid-username`"
              class="absolute right-3 top-2 text-sm font-bold text-red-500"
            >
              이미 사용중인 유저네임입니다
            </span>
            <span
              v-if="usernameCheck.valueOf() === `regex`"
              class="absolute right-3 top-2 text-sm font-bold text-red-500"
            >
              영문・숫자 / 3 ~ 16자
            </span>
            <span
              v-if="usernameCheck.valueOf() === `valid-username`"
              class="absolute right-3 top-2 text-sm font-bold text-green-500"
            >
              사용 가능한 유저네임입니다
            </span>
            <input
              v-model="username"
              required
              autoComplete="false"
              type="text"
              class="bg-inherit w-full pt-9 pb-2 px-10 text-lg font-bold border focus:ring-2 focus:ring-blue-500 border-zinc-700 outline-none rounded-md transition"
            />
            <IconAt class="absolute top-[41px] left-4 h-5 w-5" />
          </div>
          <div>
            <ButtonBlue
              type="button"
              class="w-full font-bold"
              label="다음"
              @Click="gotoScreenNumberTwo"
            />
          </div>
        </div>
        <div
          v-if="screenNumber.valueOf() === 2"
          class="mt-4 flex flex-col gap-4"
        >
          <div class="relative w-full">
            <label class="absolute left-3 top-2 font-bold text-sm">
              학적번호
            </label>
            <span
              v-if="studentIdCheck.valueOf() === `regex`"
              class="absolute right-3 top-2 text-sm font-bold text-red-500"
            >
              학적번호 형식이 다릅니다
            </span>
            <span
              v-if="studentIdCheck.valueOf() === `invalid-studentId`"
              class="absolute right-3 top-2 text-sm font-bold text-red-500"
            >
              이미 사용중인 학적번호입니다
            </span>
            <span
              v-if="studentIdCheck.valueOf() === `valid-studentId`"
              class="absolute right-3 top-2 text-sm font-bold text-green-500"
            >
              사용가능한 학적번호입니다.
            </span>
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
            <span
              v-if="passwordCheck.valueOf() === `regex`"
              class="absolute right-3 top-2 text-sm font-bold text-red-500"
            >
              비밀번호 형식이 다릅니다
            </span>
            <span
              v-if="passwordCheck.valueOf() === `valid-password`"
              class="absolute right-3 top-2 text-sm font-bold text-green-500"
            >
              사용 가능한 비밀번호입니다
            </span>
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
            <ButtonRed
              type="button"
              class="w-full font-bold"
              label="이전"
              @Click="gotoScreenNumberOne"
            />
            <ButtonBlue
              v-if="!isLoading"
              type="submit"
              class="w-full font-bold"
              label="가입"
            />
            <ButtonLoading
              v-if="isLoading"
              type="submit"
              class="w-full font-bold"
              label="가입 진행중..."
            />
          </div>
        </div>
        <NuxtLink
          to="/auth/login"
          class="mt-4 text-blue-500 text-center hover:underline"
          >로그인 하러가기</NuxtLink
        >
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import axios from "axios";
const { $api } = useNuxtApp();
const router = useRouter();

let name = ref("");
let username = ref("");
let studentId = ref("");
let password = ref("");
let screenNumber = ref(1);
let usernameCheck = ref("normal");
let passwordCheck = ref("normal");
let studentIdCheck = ref("normal");
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

// 디바운스
const debouncedUsername = useDebounceFn(async () => {
  const data = await axios
    .get(`${$api}/auth/username/${username.value}`)
    .then((res) => res.data);
  console.log("유저네임 중복확인 결과", data);
  usernameCheck.value = data.message;
  console.log("유저네임 사용가능 상태", usernameCheck.value);
}, 400);

// 디바운스
const debouncedStudentId = useDebounceFn(async () => {
  const data = await axios
    .get(`${$api}/auth/studentId/${studentId.value}`)
    .then((res) => res.data);
  console.log("학적번호 중복확인 결과", data);
  studentIdCheck.value = data.message;
  console.log("학적번호 사용가능 상태", studentIdCheck.value);
}, 400);

watch(studentId, () => {
  console.log("학적번호 감시 : ", studentId.value);

  if (studentId.value === "") {
    studentIdCheck.value = "normal";
    return;
  }

  const studentIdRegex = new RegExp("^[0-9]{2}[a-z]{1}[0-9]{4}[a-z]{1}$");
  const studentIdRegexResult = studentIdRegex.test(studentId.value);

  console.log("학적번호 Regex 확인결과", studentIdRegexResult);

  if (!studentIdRegexResult) {
    studentIdCheck.value = "regex";
    return;
  }

  debouncedStudentId();
});

watch(username, () => {
  console.log("유저네임 감시 : ", username.value);

  if (username.value === "") {
    usernameCheck.value = "normal";
    return;
  }

  const usernameRegex = new RegExp("^[a-zA-Z0-9]{3,16}$");
  const useranmeRegexResult = usernameRegex.test(username.value);

  console.log("유저네임 Regex 확인결과", useranmeRegexResult);

  if (!useranmeRegexResult) {
    usernameCheck.value = "regex";
    return;
  }

  debouncedUsername();
});

watch(password, () => {
  console.log("비밀번호 감시 : ", password.value);

  if (password.value === "") {
    passwordCheck.value = "normal";
    return;
  }

  const passwordRegex = new RegExp("^[a-zA-Z0-9]{6,20}$");
  const passwordRegexResult = passwordRegex.test(password.value);

  console.log("비밀번호 Regex 확인결과", passwordRegexResult);

  if (!passwordRegexResult) {
    passwordCheck.value = "regex";
    return;
  } else {
    passwordCheck.value = "valid-password";
  }
});

const gotoScreenNumberOne = () => {
  screenNumber.value = 1;
};

// 장면 2 보여주기
const gotoScreenNumberTwo = () => {
  if (name.value.length === 0) {
    alert("이름을 입력해주세요");
    return;
  } else if (name.value.length > 20) {
    alert("이름은 최대 20자입니다");
    return;
  }

  if (username.value.length === 0) {
    alert("유저네임을 입력해주세요");
    return;
  }

  if (usernameCheck.value !== "valid-username") {
    return;
  }
  screenNumber.value = 2;
  console.log(screenNumber.value);
};

const handleSignup = async () => {
  try {
    isLoading.value = true;
    const signupFormdata = {
      name: name.value,
      username: username.value,
      studentId: studentId.value,
      password: password.value,
    };
    const data = await axios
      .post(`${$api}/auth/signup`, { signupFormdata })
      .then((res) => res.data);

    console.log(data);

    if (data.success) {
      router.push("/auth/login");
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
