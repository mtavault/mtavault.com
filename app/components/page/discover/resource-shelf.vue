<script lang="ts" setup>
const props = defineProps<{
  resourceVariant: 'map' | 'asset' | 'generic';
  sortVariant: 'latest' | 'popular';
}>();

const { $api } = useNuxtApp();
const { t } = useI18n();

const { data, refresh } = await useAsyncData(`latest-${props.resourceVariant}`, () => $api(`resource/latest/${props.resourceVariant}`));

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
        <h4>{{ t(`pages.discover.headers.${sortVariant}.${resourceVariant}`) }}</h4>
        <UButton label="View All" :to="`search?variant=${resourceVariant}&sortBy=${sortVariant}`" color="neutral" />
      </div>
      <UPagination v-model:page="page" :items-per-page="4" :total="data?.length || 0" size="sm" variant="soft" :ui="{ root: 'max-md:hidden' }">
        <template #item><div /></template>
        <template #first><div /></template>
        <template #last><div /></template>
      </UPagination>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-md:grid-flow-col max-md:grid-cols-[unset] max-md:auto-cols-[80%] max-md:overflow-x-auto max-md:overflow-y-hidden max-md:items-start max-md:pb-4 max-md:snap-x max-md:snap-mandatory"
    >
      <template v-for="item in pageItems" v-if="data?.length">
        <ResourceCardVertical :res="item" class="max-md:snap-start" />
      </template>
      <div class="font-mono text-muted text-sm" v-else>No data available.</div>
    </div>
  </div>
</template>
