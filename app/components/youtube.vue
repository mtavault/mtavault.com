<script lang="ts" setup>
const props = defineProps<{
  id: string;
}>();

const { $YT } = useNuxtApp();

onMounted(() => {
  const player = $YT('video', {
    videoId: props.id,
    width: '100%',
    height: '100%',
  });
});
</script>
<template>
  <div class="aspect-video rounded-lg">
    <div id="video" class="rounded-lg w-full h-full"></div>
  </div>
  <!-- <iframe
    ref="video"
    :src="`https://www.youtube-nocookie.com/embed/${id}`"
    frameborder="0"
    class="w-full h-full rounded-lg"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe> -->
</template>
