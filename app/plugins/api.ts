export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const onRequest = async (ctx) => {
    await nuxtApp.runWithContext(() => {
      if (import.meta.server) {
        (ctx as any).event = useRequestEvent();
      }
    });
  };

  const api = $fetch.create({
    baseURL: import.meta.server ? config.api : config.public.api,
    // credentials: 'include',
    credentials: 'omit',
    onRequest,
    headers: useRequestHeaders(['cookie']),
  });

  return {
    provide: {
      api,
    },
  };
});
