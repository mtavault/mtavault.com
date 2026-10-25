<script lang="ts" setup>
const { $api } = useNuxtApp();

const { data } = await useAsyncData('maps/featured', () => $api('maps/featured'));
</script>
<template>
  <UCarousel
    :items="[...data, ...data, ...data]"
    v-slot="{ item }"
    arrows
    loop
    dots
    class-names
    :autoplay="{ delay: 10000 }"
    :ui="{ viewport: 'rounded-lg', item: `transition-opacity [&:not(.is-snapped)]:opacity-70 basis-[50%]` }"
    v-if="data"
  >
    <MapCardVerticalSimple :map="item" :key="item.id" />
  </UCarousel>
</template>
