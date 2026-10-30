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
  <UContainer class="p-4">
    <div class="flex flex-col gap-16 my-16">
      <PageDiscoverResourceShelf sort-variant="latest" resource-variant="map" />
      <PageDiscoverResourceShelf sort-variant="popular" resource-variant="map" />

      <PageDiscoverResourceShelf sort-variant="latest" resource-variant="model" />
      <PageDiscoverResourceShelf sort-variant="popular" resource-variant="model" />

      <PageDiscoverResourceShelf sort-variant="latest" resource-variant="resource" />
      <PageDiscoverResourceShelf sort-variant="popular" resource-variant="resource" />
    </div>
  </UContainer>
</template>
