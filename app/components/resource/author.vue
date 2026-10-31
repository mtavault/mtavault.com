<script lang="ts" setup>
const props = defineProps<{
  author: any;
}>();
</script>
<template>
  <UUser :to="`#`" :name="author.name" :avatar="{ src: `/media/.avatars/${author.userId}.webp`, provider: 'cdn' }" class="inline-flex align-middle gap-1" size="sm" v-if="author.userId" />
  <UUser :to="`#`" :name="author.name" class="inline-flex align-middle gap-0!" size="sm" v-else />
</template>
