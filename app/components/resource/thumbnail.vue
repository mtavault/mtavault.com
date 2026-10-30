<script lang="ts" setup>
const props = defineProps<{
  id: any;
}>();

const hasError = ref(false);
const hasLoaded = ref(false);

const onError = () => {
  hasError.value = true;
};

const onLoad = () => {
  hasLoaded.value = true;
};
</script>
<template>
  <LazyNuxtImg :src="`/media/${id}/images/yt-thumbnail.jpg`" class="bg-muted" :key="id + 'img'" provider="cdn" @error="onError" @load="onLoad" v-if="!hasError" />
  <img src="/img/fallback.webp" v-else />
</template>
