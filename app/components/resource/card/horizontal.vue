<script lang="ts" setup>
const props = defineProps<{
  map: any;
}>();

const wrapper = useTemplateRef('wrapper');
const isHovered = useElementHover(wrapper);
</script>
<template>
  <NuxtLink ref="wrapper" :to="`res/${map.sfu}`" class="bg-elevated rounded-lg p-2 flex gap-4 group relative overflow-hidden transition-all">
    <div class="rounded-lg overflow-hidden aspect-square size-24 md:size-40 group-hover:opacity-0 group-hover:w-0 group-hover:-translate-x-36 transition-all delay-150 relative">
      <ResourceThumbnail :id="map.id" :width="250" class="w-full h-full scale-175 object-cover transition-all absolute top-0 left-0" />
    </div>
    <Transition name="fade" v-if="map.videoID">
      <div class="absolute top-0 left-0 w-full h-full z-0 opacity-0 group-hover:opacity-100 transition-all delay-150" v-show="isHovered">
        <LazyNuxtImg :src="`/media/${map.id}/images/yt-preview.webp`" :key="map.id" :alt="map.name" class="w-full h-full object-cover transition-all" provider="cdn" />
      </div>
    </Transition>
    <div class="flex flex-col gap-4 justify-between flex-1 z-10 rounded-lg transition-all delay-150" :class="{ '-ml-4': isHovered }">
      <div class="flex flex-col">
        <h3 class="font-bold text-highlighted">{{ map.name }}</h3>
        <div class="flex items-center text-sm">
          <template v-for="(author, index) in map.authors">
            <template v-if="index !== 0 && index < map.authors.length - 1">,&nbsp;</template>
            <template v-else-if="index !== 0 && index == map.authors.length - 1">&nbsp;&&nbsp;</template>
            <span>{{ author.name }}</span>
          </template>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <Transition name="fade-down">
          <div class="flex items-center gap-2 flex-wrap" :class="{ 'delay-400': !isHovered }" v-show="!isHovered">
            <UBadge v-for="tag in map.tags" variant="outline" size="sm">
              {{ tag }}
            </UBadge>
          </div>
        </Transition>

        <Transition name="fade-down">
          <div class="flex gap-4 text-xs flex-wrap text-nowrap justify-between text-muted font-mono" :class="{ 'delay-400': !isHovered }" v-show="!isHovered">
            <div class="flex items-center gap-2 bg-accented px-2 py-1 rounded">
              <UIcon name="fas:download" class="text-primary" />
              <p>{{ Intl.NumberFormat('en-us', { notation: 'compact' }).format(map.downloads) }}</p>
            </div>
            <div class="flex items-center gap-2 bg-accented px-2 py-1 rounded">
              <UIcon name="fas:hearts" class="text-red-400" />
              <p>{{ map.ratingTotal || '-' }}</p>
            </div>
            <div class="flex items-center gap-2 bg-accented px-2 py-1 rounded">
              <UIcon name="fas:award" class="text-yellow-400" />
              <p>{{ map.awardCount || 0 }}</p>
            </div>
            <div class="flex items-center gap-2 bg-accented px-2 py-1 rounded">
              <UIcon name="fas:calendar-days" class="text-secondary" />
              <p>
                {{
                  useTimeAgo(map.createdAt, {
                    max: 'day',
                    fullDateFormatter: (date) => {
                      return new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'medium',
                      }).format(date);
                    },
                  })
                }}
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </NuxtLink>
</template>
