<script lang="ts" setup>
const route = useRoute();
const { $api } = useNuxtApp();

const { data, refresh, error } = await useAsyncData(`resource-${route.params.id}`, () => $api(`/resource/${route.params.id}`));

if (error.value || !data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Map not found',
  });
}

const seoTitle = `${data.value.name}`;
// const seoImage = (map.value.videoID?.length ? $image(`/yt-proxy/${map.value.videoURL}/hqdefault.jpg?f=webp&width=320&height=180`) : undefined)
const seoVideo = data.value.videoID?.length ? `https://www.youtube.com/embed/${data.value.videoID}` : undefined;

useSeoMeta({
  title: seoTitle,

  ogSiteName: 'mtavault.com » Map',
  ogTitle: seoTitle,
  twitterTitle: seoTitle,

  articlePublishedTime: data.value?.createdAt,
  articleModifiedTime: data.value?.updatedAt,

  ogType: 'video.other',
  ogVideo: {
    url: seoVideo,
    secureUrl: seoVideo,
    width: 1280,
    height: 720,
    type: 'text/html',
  },
});
</script>
<template>
  <UContainer>
    <div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-4">
      <div class="lg:col-span-9 md:p-4 flex flex-col gap-4">
        <!-- Map ID -->
        <div class="flex gap-4">
          <!-- Image -->
          <div class="aspect-square w-24 h-24 relative overflow-hidden rounded-lg">
            <ResourceThumbnail :id="data.id" :width="250" class="aspect-square scale-150 object-cover" />
          </div>
          <!-- Name & Author -->
          <div class="flex flex-col justify-between">
            <div class="flex flex-col">
              <h4 class="text-highlighted">{{ data.name }}</h4>
              <p class="text-sm text-muted z-60">
                by
                <template v-for="(author, index) in data.authors">
                  <template v-if="index !== 0 && index < data.authors.length - 1">,&nbsp;</template>
                  <template v-else-if="index !== 0 && index === data.authors.length - 1">&nbsp;&&nbsp;</template>
                  <ResourceAuthor :author="author" class="z-60" />
                </template>
              </p>
            </div>

            <!-- Info -->
            <div class="flex gap-4 text-xs flex-wrap text-nowrap justify-between text-muted font-mono">
              <div class="flex items-center gap-2 bg-accented px-2 py-1 rounded-lg">
                <UIcon name="fas:download" class="text-primary" />
                <p>{{ Intl.NumberFormat('en-us', { notation: 'compact' }).format(data.downloads) }}</p>
              </div>
              <div class="flex items-center gap-2 bg-accented px-2 py-1 rounded-lg">
                <UIcon name="fas:hearts" class="text-red-400" />
                <p>{{ data.favs?.length || 0 }}</p>
              </div>
              <div class="flex items-center gap-2 bg-accented px-2 py-1 rounded-lg">
                <UIcon name="fas:award" class="text-yellow-400" />
                <p>{{ data.awardCount || 0 }}</p>
              </div>
              <div class="flex items-center gap-2 bg-accented px-2 py-1 rounded-lg">
                <UIcon name="fas:calendar-days" class="text-secondary" />
                <p>
                  {{
                    useTimeAgo(data.createdAt, {
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
          </div>

          <!-- <div class="ml-auto flex items-center justify-center">
            <div class="flex flex-col items-center">
              <UIcon name="fas:wreath-laurel" class="text-yellow-400 size-12" />
              <span>featured</span>
            </div>
          </div> -->
        </div>

        <!-- Content Container -->
        <template v-if="data.type === 'model'">
          <div class="aspect-video border border-default rounded-lg">3d scene</div>
        </template>
        <Youtube :id="data.videoID" class="aspect-video w-full rounded-lg border border-default" v-if="data.videoID" />
      </div>
      <UPageAside class="lg:col-span-3 md:p-4">
        <UCard>allo</UCard>
      </UPageAside>
    </div>
  </UContainer>
</template>
