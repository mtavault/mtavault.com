<script lang="ts" setup>
import { useTimeAgo } from '@vueuse/core';

const { $api } = useNuxtApp();
const { t } = useI18n();

const { data } = await useAsyncData('maps', () =>
  $api('maps', {
    query: {
      page: 1,
      size: 20,
      sort: 'ratingTotal',
    },
  }),
);
</script>
<template>
  <Hero />
  <UContainer>
    <div class="grid grid-cols-3 gap-4 p-4">
      <MapCardHorizontal :map="map" v-for="map in data?.data?.maps" />
    </div>
  </UContainer>
</template>
