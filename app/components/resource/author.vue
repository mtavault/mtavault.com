<script lang="ts" setup>
const props = defineProps<{
  author: any;
}>();
</script>
<template>
  <ULink raw :to="`#`" class="inline-flex items-center gap-0.5 align-middle text-primary hover:text-primary-400 transition-colors">
    <UAvatar :src="`/media/.avatars/${author.userId}.webp`" size="xs" provider="cdn" v-if="author.userId" />
    <span>{{ author.name }}</span>
  </ULink>
</template>
