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
  <NuxtLink ref="wrapper" to="#" class="flex flex-col">
    <div class="rounded-lg overflow-hidden aspect-video relative max-w-96">
      <img :src="`https://assets.mtavault.com/yt-proxy/${map.videoURL}/maxresdefault.jpg?f=webp`" class="w-full h-full scale-175 object-cover transition-all absolute top-0 left-0" />
    </div>
    <!-- <div class="flex flex-col gap-4 flex-1 z-10 rounded-lg transition-all" :class="{ 'p-4 -ml-4': isHovered }">
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

      <Transition name="fade">
        <div class="flex items-center gap-2 flex-wrap" v-if="!isHovered">
          <UBadge v-for="tag in map.tags" variant="outline" size="sm">
            {{ tag.name }}
          </UBadge>
        </div>
      </Transition>

      <Transition name="fade">
        <USeparator type="dashed" v-if="!isHovered" />
      </Transition>

      <Transition name="fade">
        <div class="flex gap-4 text-xs justify-between text-nowrap text-muted bg-accented rounded-md px-4 py-2" v-if="!isHovered">
          <div class="flex items-center gap-2">
            <UIcon name="fas:download" />
            <p>1337</p>
          </div>
          <div class="flex items-center gap-2">
            <UIcon name="fas:heart" />
            <p>3</p>
          </div>
          <div class="flex items-center gap-2">
            <UIcon name="fas:award" />
            <p>0</p>
          </div>
          <div class="flex items-center gap-2">
            <UIcon name="fas:calendar" />
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
    </div> -->
  </NuxtLink>
</template>
