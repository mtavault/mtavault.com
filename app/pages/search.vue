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
  <UContainer>
    <div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-4">
      <UPageAside class="lg:col-span-3 md:p-4">
        <div class="flex flex-col gap-8">
          <UInput v-model="search" icon="fas:magnifying-glass" :placeholder="t('input.placeholders.search')" class="w-full" />

          <div class="flex flex-col gap-2">
            <h4>Filters</h4>
            <UAccordion
              type="multiple"
              :items="[
                {
                  label: 'Browse by',
                  slot: 'browse-by',
                },
                {
                  label: 'Tags',
                  slot: 'tags',
                },
              ]"
            >
              <template #browse-by>
                <URadioGroup :items="['All', 'Maps', 'Assets', 'Resources']" variant="card" />
              </template>
              <template #tags>tags</template>
            </UAccordion>
          </div>
        </div>
      </UPageAside>
      <div class="lg:col-span-9 md:p-4 flex flex-col gap-4">
        <ResourceCardHorizontal :map="map" v-for="map in [...data?.data, ...data?.data, ...data?.data, ...data?.data, ...data?.data, ...data?.data]" />
      </div>
    </div>
  </UContainer>
</template>
