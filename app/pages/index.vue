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
  <UContainer>
    <div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-4">
      <UPageAside class="lg:col-span-2">
        <div class="flex items-center flex-col gap-4">
          <UPagination v-model:page="pagination.page" :items-per-page="pagination.size" :total="data?.data?.totalItems" size="sm" variant="soft" :sibling-count="1" />
          <UInput v-model="search" icon="fas:magnifying-glass" :placeholder="t('input.placeholders.search')" class="w-full" />
        </div>
      </UPageAside>
      <div class="lg:col-span-10">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:p-4">
          <MapCardHorizontal :map="map" v-for="map in data?.data?.maps" />
        </div>
      </div>
    </div>
    <!-- <USplitter id="index-splitter" :items="splitterItems" class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-10">
      <template #sidebar>sidebar</template>
      <template #main>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:p-4">
          <MapCardHorizontal :map="map" v-for="map in data?.data?.maps" />
        </div>
      </template>
    </USplitter> -->
  </UContainer>
</template>
