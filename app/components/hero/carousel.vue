<script lang="ts" setup>
const { $api } = useNuxtApp();

const { data } = await useAsyncData('featured-resources', () => $api('resource/featured'));
</script>
<template>
  <UCarousel
    :items="data"
    v-slot="{ item }"
    arrows
    loop
    dots
    class-names
    :autoplay="{ delay: 10000 }"
    :ui="{ viewport: 'rounded-lg', item: `transition-[filter] [&:not(.is-snapped)]:brightness-50 basis-[50%]` }"
    v-if="data"
  >
    <ResourceCardVerticalSimple :res="item" :key="item.id" />
  </UCarousel>
</template>
