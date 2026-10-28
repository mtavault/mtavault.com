<script lang="ts" setup>
const props = defineProps<{
  variant: 'map' | 'asset' | 'generic';
}>();

const { $api } = useNuxtApp();
const { t } = useI18n();

const { data, refresh } = await useAsyncData(`latest-${props.variant}`, () => $api(`resource/latest/${props.variant}`));

const page = ref(1);

const pageItems = computed(() => {
  const itemList = data.value;
  return itemList.slice((page.value - 1) * 4, page.value * 4);
});
</script>
<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between">
      <div class="flex items-center gap-4">
        <h4>{{ t(`pages.discover.headers.latest.${variant}`) }}</h4>
        <UButton label="View All" :to="`search?variant=${variant}`" color="neutral" />
      </div>
      <UPagination v-model:page="page" :items-per-page="4" :total="data?.length || 0" size="sm" variant="soft">
        <template #item><div /></template>
        <template #first><div /></template>
        <template #last><div /></template>
      </UPagination>
    </div>
    <div class="grid gap-8 grid-cols-4">
      <template v-for="item in pageItems" v-if="data.length">
        <ResourceCardVertical :res="item" />
      </template>
      <div class="font-mono text-muted text-sm" v-else>No data available.</div>
    </div>
  </div>
</template>
