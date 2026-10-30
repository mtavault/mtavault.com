<script lang="ts" setup>
const props = defineProps<{
  res: any;
}>();

const wrapper = useTemplateRef('wrapper');
const isHovered = useElementHover(wrapper);
</script>
<template>
  <div class="relative min-w-0">
    <!-- Skeleton to match parent height to absolute content -->
    <div class="invisible pointer-events-none">
      <div class="w-full aspect-video" />
      <div class="flex flex-col gap-2 p-2">
        <h4 class="font-bold">&thinsp;</h4>
        <p class="text-sm">&thinsp;</p>
      </div>
    </div>

    <!-- Actual Card -->
    <div
      ref="wrapper"
      class="group absolute inset-0 z-0 h-fit overflow-hidden rounded bg-elevated border border-default shadow-md transition-all hover:z-50 hover:scale-105 origin-top hover:shadow-2xl shadow-black"
    >
      <!-- Link Overlay -->
      <NuxtLink :to="`/res/${res.sfu}`" class="absolute top-0 left-0 w-full h-full z-50" />

      <!-- Image -->
      <div class="w-full rounded overflow-hidden aspect-video relative pointer-events-none">
        <NuxtImg
          :src="`/map/${res.id}/images/yt-thumbnail.jpg`"
          :key="res.id + 'img'"
          :width="250"
          class="w-full object-cover scale-125 h-full z-1 aspect-video"
          placeholder="/img/fallback.webp"
          provider="cdn"
        />
        <Transition name="fade" v-if="res.videoID">
          <LazyNuxtImg
            :src="`/map/${res.id}/images/yt-preview.webp`"
            :key="res.id + 'anim'"
            class="w-full h-full object-cover transition-all absolute top-0 left-0 z-20 scale-175"
            :class="{ 'scale-100!': isHovered }"
            provider="cdn"
            v-if="isHovered"
          />
        </Transition>
      </div>

      <!-- Map Name & Author -->
      <div class="flex flex-col gap-2 p-2">
        <h4 class="text-highlighted">{{ res.name }}</h4>
        <p class="text-sm text-muted z-60">
          by
          <template v-for="(author, index) in res.authors">
            <template v-if="index !== 0 && index < res.authors.length - 1">,&nbsp;</template>
            <template v-else-if="index !== 0 && index === res.authors.length - 1">&nbsp;&&nbsp;</template>
            <ULink to="#" class="z-60">{{ author.name }}</ULink>
          </template>
        </p>
      </div>

      <div class="flex flex-col gap-4">
        <!-- Hover Data -->
        <div class="grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:grid-rows-[1fr] group-hover:opacity-100">
          <div class="overflow-hidden">
            <div class="flex flex-col gap-4 p-2">
              <USeparator type="dashed" />
              <!-- Tags -->
              <div class="flex items-center gap-2 flex-wrap">
                <UBadge v-for="tag in res.tags" variant="outline" size="sm">
                  {{ tag }}
                </UBadge>
              </div>
              <!-- Data (Downloads, Rating, Awards, Release Date) -->
              <div class="flex gap-4 text-xs flex-wrap text-nowrap justify-between text-muted font-mono">
                <div class="flex items-center gap-2 bg-accented px-2 py-1 rounded">
                  <UIcon name="fas:download" class="text-primary" />
                  <p>{{ Intl.NumberFormat('en-us', { notation: 'compact' }).format(res.downloads) }}</p>
                </div>
                <div class="flex items-center gap-2 bg-accented px-2 py-1 rounded">
                  <UIcon name="fas:hearts" class="text-red-400" />
                  <p>{{ res.ratingTotal || '-' }}</p>
                </div>
                <div class="flex items-center gap-2 bg-accented px-2 py-1 rounded">
                  <UIcon name="fas:award" class="text-yellow-400" />
                  <p>{{ res.awardCount || 0 }}</p>
                </div>
                <div class="flex items-center gap-2 bg-accented px-2 py-1 rounded">
                  <UIcon name="fas:calendar-days" class="text-secondary" />
                  <p>
                    {{
                      useTimeAgo(res.createdAt, {
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
              <USeparator type="dashed" />
              <!-- Buttons -->
              <div class="flex justify-end gap-4 z-60">
                <UButton label="Download" color="primary" icon="fas:download" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
