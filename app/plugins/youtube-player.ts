import YT from 'youtube-player';

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      YT,
    },
  };
});
