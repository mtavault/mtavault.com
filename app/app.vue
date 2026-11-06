<script setup>
import { useCssVar } from '@vueuse/core';

const config = useRuntimeConfig().public;

const title = 'mtavault';
const description = 'Map sharing platform for Multi Theft Auto: San Andreas.';

useHead({
  titleTemplate: (chunk) => (chunk ? `${chunk} - ${title}` : title),
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: config.cdn },
  ],
  htmlAttrs: {
    lang: 'en',
  },
});

useSeoMeta({
  // title,
  description,
  ogTitle: title,
  ogImage: '/img/logo-icon.webp',
  ogDescription: description,
  twitterCard: 'summary_large_image',
  themeColor: useCssVar('--color-primary'),
});
</script>

<template>
  <NuxtLoadingIndicator />
  <UApp>
    <NuxtLayout />
  </UApp>
</template>
