<script setup>
const title = 'mtavault';
const description = 'Map sharing platform for Multi Theft Auto: San Andreas.';

useHead({
  titleTemplate: (chunk) => (chunk ? `${chunk.toLowerCase()} » ${title}` : title),
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en',
  },
});

useSeoMeta({
  // title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <UApp>
    <NuxtLayout />
  </UApp>
</template>
