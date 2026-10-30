<script lang="ts" setup>
const { $api } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const DEFAULT_PAGE_SIZE = 20;
const VARIANTS = [
  {
    label: 'All',
    value: '',
  },
  {
    label: 'Maps',
    value: 'map',
  },
  {
    label: 'Resources',
    value: 'resource',
  },
  {
    label: 'Models',
    value: 'model',
  },
];

const search = ref(route.query?.search || '');
const variant = ref(route.query?.variant || '');
const sortBy = ref(route.query?.sortBy || '');
const pagination = ref({
  page: route.query?.page || 1,
  size: route.query?.size || DEFAULT_PAGE_SIZE,
});

const { data, refresh } = await useAsyncData('resources', () =>
  $api('resource', {
    query: {
      page: pagination.value.page,
      size: pagination.value.size,
      search: search.value,
      type: variant.value.length ? variant.value : undefined,
    },
  }),
);

const updateQueryParameters = () => {
  router.push({
    query: {
      page: pagination.value.page > 1 ? pagination.value.page : undefined,
      limit: pagination.value.size !== DEFAULT_PAGE_SIZE ? pagination.value.size : undefined,
      search: search.value.length ? search.value : undefined,
      variant: variant.value.length ? variant.value : undefined,
      sortBy: sortBy.value.length ? sortBy.value : undefined,
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
  [pagination, variant],
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
          <UInput v-model="search" icon="fas:magnifying-glass" :placeholder="t('input.placeholders.search')" size="xl" class="w-full" />

          <div class="flex flex-col gap-2">
            <h4>Filters</h4>
            <!-- Browse By -->
            <UCollapsible class="gap-2 flex flex-col" default-open>
              <template #default="{ open }">
                <UButton label="Browse by" :variant="open ? 'soft' : 'ghost'" color="neutral" class="w-full flex justify-between items-center" size="xl">
                  <template #trailing>
                    <UIcon name="fas:chevron-up" class="transition-all" :class="{ 'rotate-180': !open }" />
                  </template>
                </UButton>
              </template>
              <template #content>
                <UCard variant="soft">
                  <URadioGroup v-model="variant" :items="VARIANTS" />
                </UCard>
              </template>
            </UCollapsible>
          </div>
        </div>
      </UPageAside>
      <div class="lg:col-span-9 md:p-4 flex flex-col gap-4">
        <ResourceCardHorizontal :res="map" v-for="map in data?.data" />
      </div>
    </div>
  </UContainer>
</template>
