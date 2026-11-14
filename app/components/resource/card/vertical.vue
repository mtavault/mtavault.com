<script lang="ts" setup>
const props = defineProps<{
  res: any;
}>();

const { t, localeProperties } = useI18n();
const toast = useToast();
const { downloadFile, progress, completed, error: downloadError, downloading } = useFileDownload();

const wrapper = useTemplateRef('wrapper');
const isHovered = useElementHover(wrapper);

const downloadMap = async () => {
  try {
    await downloadFile(props.res.id, props.res.fileName);
  } catch (err) {
    toast.add({
      color: 'error',
      title: 'Download Failed',
      description: downloadError.value || 'Unknown Error',
      icon: 'fas:user-robot-xmarks',
    });
  }
};
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
      class="group absolute inset-0 z-0 h-fit overflow-hidden rounded-lg bg-elevated/50 hover:bg-elevated hover:shadow-md shadow-black transition-all hover:z-50 hover:scale-105 hover:-translate-y-20 origin-top"
    >
      <!-- Link Overlay -->
      <ResourceLink :id="res.sfu" :type="res.type" class="absolute top-0 left-0 w-full h-full z-50" />

      <!-- Image -->
      <div class="w-full rounded-lg overflow-hidden aspect-video relative pointer-events-none">
        <ResourceThumbnail :id="res.id" :key="res.id + 'thumb'" :width="450" class="w-full object-cover scale-125 h-full z-1 aspect-video" />
        <Transition name="fade" v-if="res.videoID">
          <LazyNuxtImg
            :src="`/${res.id}/images/yt-preview.webp`"
            :key="res.id + 'anim'"
            class="w-full h-full object-cover transition-all absolute top-0 left-0 z-20 scale-175"
            :class="{ 'scale-100!': isHovered }"
            provider="cdn"
            placeholder="/img/fallback.webp"
            v-if="isHovered"
          />
        </Transition>
      </div>

      <!-- Map Name & Author -->
      <div class="flex flex-col gap-2 p-2">
        <h4 class="text-highlighted">{{ res.name }}</h4>
        <div class="text-sm text-muted z-60 flex items-center gap-1">
          <i18n-t keypath="common.by" />
          <template v-for="(author, index) in res.authors">
            <template v-if="index !== 0 && index < res.authors.length - 1">,&nbsp;</template>
            <template v-else-if="index !== 0 && index === res.authors.length - 1">&nbsp;&&nbsp;</template>
            <ResourceAuthor :author="author" class="z-60" />
          </template>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <!-- Hover Data -->
        <div class="grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:grid-rows-[1fr] group-hover:opacity-100">
          <div class="overflow-hidden">
            <div class="flex flex-col gap-4 p-2">
              <USeparator type="dashed" />
              <!-- Tags -->
              <div class="flex items-center gap-2 flex-wrap" v-if="res.tags.length">
                <UBadge v-for="tag in res.tags" variant="outline" size="sm">
                  {{ tag }}
                </UBadge>
              </div>
              <!-- Data (Views, Downloads, Rating, Awards, Release Date) -->
              <ul class="flex gap-4">
                <li>
                  <UUser :avatar="{ icon: 'fas:eye' }" :description="Intl.NumberFormat('en-us', { notation: 'compact' }).format(res.views)" />
                </li>
                <li>
                  <UUser :avatar="{ icon: 'fas:download' }" :description="Intl.NumberFormat('en-us', { notation: 'compact' }).format(res.downloads)" />
                </li>
                <li>
                  <UUser :avatar="{ icon: 'fas:hearts' }" :description="res.favs?.length || '0'" />
                </li>
                <li>
                  <UUser :avatar="{ icon: 'fas:award' }" :description="res.awardCount || '0'" />
                </li>
              </ul>
              <USeparator type="dashed" />
              <!-- Buttons -->
              <div class="flex justify-between gap-4 z-60">
                <UUser :avatar="{ icon: 'fas:calendar-days' }">
                  <template #description>
                    <i18n-d :value="res.createdAt" format="medium" />
                  </template>
                </UUser>
                <UButton :label="t('common.download')" color="primary" icon="fas:download" variant="solid" size="sm" @click="downloadMap" :disabled="downloading || downloadError?.length > 0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
