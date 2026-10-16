<script lang="ts" setup>
const props = defineProps<{
  map: any;
}>();

const wrapper = useTemplateRef('wrapper');
const isHovered = useElementHover(wrapper);
</script>
<style>
.gif-enter-from,
.gif-leave-to {
  opacity: 0;
  transform: translateX(200px);
  transform-origin: right;
}
</style>
<template>
  <!-- https://cdn.dribbble.com/userupload/47219301/file/55512bef199ad33ba84341c82df326a6.png?resize=1600x1200&vertical=center -->
  <NuxtLink ref="wrapper" to="#" class="bg-elevated rounded-lg p-2 flex gap-4 group relative overflow-hidden transition-all" :class="{ 'p-0!': isHovered }">
    <!-- group-hover:opacity-0 group-hover:w-0 -->
    <div class="rounded-lg overflow-hidden aspect-square size-40 group-hover:opacity-0 group-hover:w-0 group-hover:-translate-x-36 transition-all relative">
      <img :src="`https://assets.mtavault.com/yt-proxy/${map.videoURL}/hqdefault.jpg?f=webp`" class="w-full h-full scale-175 object-cover transition-all absolute top-0 left-0" />
    </div>
    <Transition name="gif">
      <div class="absolute top-0 left-0 w-full h-full z-0 opacity-0 group-hover:opacity-100 transition-all" v-show="isHovered">
        <img :src="`https://assets.mtavault.com/.maps/${map.id}/thumbnail.gif`" class="w-full h-full object-cover transition-all" loading="lazy" />
      </div>
    </Transition>
    <div class="flex flex-col gap-4 justify-between flex-1 z-10 rounded-lg transition-all" :class="{ 'p-4 -ml-4': isHovered }">
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
        <Transition name="fade">
          <div class="flex items-center gap-2 flex-wrap" v-show="!isHovered">
            <UBadge v-for="tag in map.tags" variant="outline" size="sm">
              {{ tag.name }}
            </UBadge>
          </div>
        </Transition>

        <Transition name="fade">
          <div class="flex gap-4 text-xs justify-between text-nowrap text-muted bg-accented rounded-md px-4 py-2" v-show="!isHovered">
            <div class="flex items-center gap-2">
              <UIcon name="fas:download" class="text-primary" />
              <p>{{ Intl.NumberFormat('en-us', { notation: 'compact' }).format(map.downloads) }}</p>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="fas:hearts" class="text-red-400" />
              <p>{{ map.ratingTotal }}</p>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="fas:award" class="text-yellow-400" />
              <p>{{ map.awardCount }}</p>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="fas:calendar" class="text-secondary" />
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
