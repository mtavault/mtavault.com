<script lang="ts" setup>
const { $api } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const DEFAULT_PAGE_SIZE = 20;

const search = ref(route.query?.search || '');
const pagination = ref({
  page: route.query?.page || 1,
  size: route.query?.size || DEFAULT_PAGE_SIZE,
});

const { data, refresh } = await useAsyncData('maps', () =>
  $api('maps', {
    query: {
      page: pagination.value.page,
      size: pagination.value.size,
      search: search.value,
    },
  }),
);

const updateQueryParameters = () => {
  router.push({
    query: {
      page: pagination.value.page > 1 ? pagination.value.page : undefined,
      limit: pagination.value.size !== DEFAULT_PAGE_SIZE ? pagination.value.size : undefined,
      search: search.value.length ? search.value : undefined,
    },
  });
};

watchDebounced(
  [search],
  () => {
    pagination.value.page = 1;
    refresh();
    updateQueryParameters();
  },
  { debounce: 500, maxWait: 2000 },
);

watch(
  [pagination],
  () => {
    refresh();
    updateQueryParameters();
  },
  { deep: true },
);
</script>
<template>
  <Hero />
  <div class="sticky top-(--ui-header-height) z-40 border-b border-default backdrop-blur-md bg-default/75 px-4 py-2">
    <UContainer class="flex items-center justify-between">
      <div class="flex md:flex-row flex-col items-center justify-between gap-2 w-full">
        <UInput v-model="search" icon="fas:magnifying-glass" :placeholder="t('input.placeholders.search')" size="sm" class="min-w-96" />
        <UPagination v-model:page="pagination.page" :items-per-page="pagination.size" :total="data?.meta.total_items" size="sm" variant="soft" />
      </div>
    </UContainer>
  </div>
  <UContainer>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:p-4">
      <MapCardHorizontal :map="map" v-for="map in data?.data" />
    </div>
  </UContainer>
</template>
