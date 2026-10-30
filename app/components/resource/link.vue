<script lang="ts" setup>
const props = defineProps<{
  id: any;
  type: 'map' | 'asset' | 'generic';
}>();
</script>
<template>
  <NuxtLink :to="`/res/${id}`">
    <slot />
  </NuxtLink>
</template>
