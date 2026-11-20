<script lang="ts" setup>
const route = useRoute();
const { data, refresh, error } = await useResource(computed(() => route.params.id as string));
</script>
<template>
  <UPageCard icon="fas:cubes" title="Most Used Objects" v-if="data.type === 'map' && data.meta?.objects.length">
    <UScrollArea class="max-h-96 pr-3" shadow>
      <div class="space-y-3">
        <UPageCard :to="`https://dev.prineside.com/en/gtasa_samp_model_id/model/${object.id}`" target="_blank" external variant="naked" v-for="object in data.meta.objects.slice(0, 20)">
          <div class="flex gap-2 items-center">
            <div class="aspect-square relative overflow-hidden rounded-lg size-12">
              <NuxtImg :src="`/.objects/${object.id}.webp`" provider="cdn" class="scale-250" width="150" lazy />
            </div>
            <div class="flex flex-col flex-1 gap-1">
              <div class="flex items-center justify-between">
                <div class="flex flex-col">
                  <p class="text-sm font-semibold">{{ gtasaObjects[object.id]?.name ?? 'Unknown' }}</p>
                  <p class="text-muted text-xs">id: {{ object.id }}</p>
                </div>
                <div class="flex flex-col items-end">
                  <p class="text-sm">×{{ Intl.NumberFormat('en-us', { notation: 'compact' }).format(object.amount) }}</p>
                  <p class="text-muted text-xs">{{ ((100 / data.meta?.total_objects) * object.amount).toFixed(1) }}%</p>
                </div>
              </div>
              <UProgress :max="data.meta?.total_objects" :model-value="object.amount" size="xs" />
            </div>
          </div>
        </UPageCard>
      </div>
    </UScrollArea>
  </UPageCard>
</template>
