export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      api: useRuntimeConfig().public.api,
    },
  };
});
