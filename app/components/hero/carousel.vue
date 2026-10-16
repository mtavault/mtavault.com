<script lang="ts" setup>
const { $api } = useNuxtApp();

const { data } = await useAsyncData('maps/featured', () => $api('maps/featured'));
</script>
<template>
  <UCarousel
    :items="data.data"
    v-slot="{ item }"
    arrows
    loop
    dots
    class-names
    :autoplay="{ delay: 10000 }"
    :ui="{ viewport: 'rounded-lg', item: 'basis-1/2 transition-opacity [&:not(.is-snapped)]:opacity-70' }"
  >
    <MapCardVertical :map="item" :key="item.id" />
  </UCarousel>
</template>
