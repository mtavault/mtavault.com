<script lang="ts" setup>
const props = defineProps<{
  id: any;
  type: 'map' | 'model' | 'resource';
}>();
</script>
<template>
  <NuxtLink :to="`/res/${id}`">
    <slot />
  </NuxtLink>
</template>
