<script lang="ts" setup>
const props = defineProps<{
  res: any;
}>();

const wrapper = useTemplateRef('wrapper');
const isHovered = useElementHover(wrapper);
</script>
<template>
  <div ref="wrapper" class="relative min-w-0 rounded-lg overflow-hidden border border-default aspect-video">
    <!-- Link Overlay -->
    <ResourceLink :id="res.sfu" :type="res.type" class="absolute top-0 left-0 w-full h-full z-50" />

    <!-- Image -->
    <ResourceThumbnail :id="res.id" :type="res.type" class="absolute top-0 left-0 w-full h-full scale-125 -z-2" />

    <!-- Preview -->
    <Transition name="fade" v-if="res.videoID">
      <LazyNuxtImg
        :src="`/media/${res.id}/images/yt-preview.webp`"
        :key="res.id + 'anim'"
        :alt="res.name"
        class="w-full h-full object-cover transition-all absolute top-0 left-0 z-20 scale-175"
        :class="{ 'scale-100!': isHovered }"
        provider="cdn"
        v-if="isHovered"
      />
    </Transition>

    <div class="absolute bottom-0 w-full flex flex-col p-2 bg-linear-to-b from-transparent to-default">
      <h3 class="font-bold text-highlighted">{{ res.name }}</h3>
      <p class="text-sm text-muted">
        by
        <template v-for="(author, index) in res.authors">
          <template v-if="index !== 0 && index < res.authors.length - 1">,&nbsp;</template>
          <template v-else-if="index !== 0 && index === res.authors.length - 1">&nbsp;&&nbsp;</template>
          <ResourceAuthor :author="author" class="z-60" />
        </template>
      </p>
    </div>
  </div>
</template>
