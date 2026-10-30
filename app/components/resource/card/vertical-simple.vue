<script lang="ts" setup>
const props = defineProps<{
  res: any;
}>();

const wrapper = useTemplateRef('wrapper');
const isHovered = useElementHover(wrapper);
</script>
<template>
  <div class="relative min-w-0 bg-elevated border border-default rounded hidden">
    <NuxtImg :src="`/map/${res.id}/images/yt-thumbnail.jpg`" :key="res.id + 'img'" :alt="res.name" :width="250" class="w-full h-full aspect-video" provider="cdn" />
  </div>
  <div ref="wrapper" class="relative min-w-0 bg-elevated rounded border border-default">
    <!-- Link Overlay -->
    <NuxtLink :to="`/res/${res.sfu}`" class="absolute top-0 left-0 w-full h-full z-10" />

    <!-- Image -->
    <div class="w-full rounded overflow-hidden aspect-video relative pointer-events-none">
      <NuxtImg
        :src="`/map/${res.id}/images/yt-thumbnail.jpg`"
        :key="res.id + 'img'"
        :alt="res.name"
        :width="250"
        class="w-full object-cover scale-125 h-full z-1 aspect-video"
        provider="cdn"
        placeholder="/img/fallback.webp"
      />
      <Transition name="fade">
        <LazyNuxtImg
          :src="`/map/${res.id}/images/yt-preview.webp`"
          :key="res.id + 'anim'"
          :alt="res.name"
          class="w-full h-full object-cover transition-all absolute top-0 left-0 z-20 scale-175"
          :class="{ 'scale-100!': isHovered }"
          provider="cdn"
          v-if="isHovered"
        />
      </Transition>
    </div>

    <!-- Map Name & Author -->
    <div class="flex flex-col gap-2 p-2">
      <h3 class="font-bold text-highlighted">{{ res.name }}</h3>
      <p class="text-sm text-muted">
        by
        <template v-for="(author, index) in res.authors">
          <template v-if="index !== 0 && index < res.authors.length - 1">,&nbsp;</template>
          <template v-else-if="index !== 0 && index === res.authors.length - 1">&nbsp;&&nbsp;</template>
          {{ author.name }}
        </template>
      </p>
    </div>
  </div>
</template>
