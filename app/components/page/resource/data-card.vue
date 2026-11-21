<script lang="ts" setup>
const [DefineTemplate, ReuseTemplate] = createReusableTemplate();
const route = useRoute();
const { data, refresh, error } = await useResource(computed(() => route.params.id as string));
</script>
<template>
  <DefineTemplate v-slot="{ icon, label, $slots }">
    <div class="grid grid-cols-7 items-center">
      <div class="col-span-1">
        <UAvatar :icon="icon" />
      </div>
      <div class="col-span-2 text-sm font-semibold">
        {{ label }}
      </div>
      <div class="col-span-4 text-sm">
        <component :is="$slots.default" />
      </div>
    </div>
  </DefineTemplate>
  <UPageCard>
    <div class="flex flex-col gap-8">
      <ul class="flex flex-col gap-4">
        <ReuseTemplate icon="fas:tags" label="Tags" v-if="data.tags?.length">
          <div class="flex items-center gap-2 flex-wrap">
            <UBadge v-for="tag in data.tags" variant="outline" size="sm">
              {{ tag.tagId }}
            </UBadge>
          </div>
        </ReuseTemplate>
        <ReuseTemplate icon="fas:cubes" label="Objects" v-if="data.type === 'map'">
          {{ Intl.NumberFormat('en-us', { notation: 'compact' }).format(data.meta?.total_objects) }}
        </ReuseTemplate>

        <ReuseTemplate icon="fas:clock" label="Time" v-if="data.type === 'map'">
          {{ data.meta?.time }}
        </ReuseTemplate>

        <ReuseTemplate icon="fas:cloud" label="Weather" v-if="data.type === 'map'">
          {{ gtasaWeathers(data.meta?.weather) }}
          <p class="text-xs text-muted">id: {{ data.meta.weather }}</p>
        </ReuseTemplate>

        <ReuseTemplate icon="fas:cars" label="Vehicles" v-if="data.type === 'map'">
          {{ data.meta?.vehicles.map((x) => gtasaVehicles[x].name).join(', ') }}
        </ReuseTemplate>
      </ul>
    </div>
  </UPageCard>
</template>
