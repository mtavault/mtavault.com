import Flagpack from '@nonfx/vue-flagpack';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Flagpack, {
    name: 'Flag',
  });
});
