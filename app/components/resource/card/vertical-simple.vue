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
          {{ author.name }}
        </template>
      </p>
    </div>
  </div>

  <div class="relative min-w-0 bg-elevated rounded border border-default hidden">
    <ResourceLink :id="res.sfu" :type="res.type" class="absolute top-0 left-0 w-full h-full z-50" />

    <!-- Image -->
    <div class="w-full rounded-lg overflow-hidden aspect-video relative pointer-events-none">
      <ResourceThumbnail :id="res.id" :width="250" class="w-full object-cover scale-125 h-full z-1 aspect-video" />
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
