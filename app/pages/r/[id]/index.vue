<script lang="ts" setup>
const route = useRoute();
const { data } = useNuxtData(`resource-${route.params.id}`);
</script>
<template>
  <template v-if="data.type === 'model'">
    <div class="aspect-video border border-default rounded-lg">3d scene</div>
  </template>
  <Youtube :id="data.videoID" class="aspect-video w-full rounded-lg" v-if="data.videoID" />
</template>
