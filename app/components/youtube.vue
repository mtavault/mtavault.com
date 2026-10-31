<script lang="ts" setup>
const props = defineProps<{
  id: string;
}>();

const { $YT } = useNuxtApp();

const ready = ref(false);

onMounted(() => {
  const player = $YT('video', {
    videoId: props.id,
    width: '100%',
    height: '100%',
  });

  player.on('ready', () => {
    ready.value = true;
  });
});
</script>
<template>
  <div class="aspect-video rounded-lg relative">
    <div id="video" class="rounded-lg w-full h-full"></div>
    <Transition name="fade">
      <div class="absolute w-full h-full flex justify-center items-center top-0 left-0 z-20 backdrop-blur-xs rounded-lg" v-if="!ready">
        <Loader />
      </div>
    </Transition>
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
