<script lang="ts" setup>
const route = useRoute();
const { data, refresh, error } = await useResource(computed(() => route.params.id as string));
</script>
<template>
  <template v-if="data.type === 'model'">
    <div class="aspect-video border border-default rounded-lg">3d scene</div>
  </template>
  <Youtube :id="data.videoID" class="aspect-video w-full rounded-lg" v-if="data.videoID" />
</template>
