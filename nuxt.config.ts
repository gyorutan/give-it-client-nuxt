// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@vueuse/nuxt"],
  build: {
    transpile: ["vue-toastification"],
  },
  runtimeConfig: {
    public: {
      api: process.env.NUXT_API,
    },
  },
});