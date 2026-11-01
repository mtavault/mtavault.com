<script lang="ts" setup>
const route = useRoute();
const { t, localeProperties } = useI18n();
const { $api } = useNuxtApp();
const img = useImage();
const { user, loggedIn } = useUserSession();

const { data, refresh, error } = await useAsyncData(`resource-${route.params.id}`, () => $api(`/resource/${route.params.id}`));

if (error.value || !data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Map not found',
  });
}

const seo = {
  title: data.value.name,
  description: `by ${new Intl.ListFormat('en', { style: 'short' }).format(data.value.authors.map((x) => x.name))}`,
  image: data.value.videoID ? img(`/media/${data.value.id}/images/yt-preview.webp`, {}, { provider: 'cdn' }) : undefined,
  imageAlt: data.value.videoID ? img(`/media/${data.value.id}/images/yt-thumbnail.jpg`, {}, { provider: 'cdn' }) : undefined,
  video: data.value.videoID ? `https://www.youtube.com/embed/${data.value.videoID}` : undefined,
};

useSeoMeta({
  ogSiteName: 'mtavault.com » Map',
  title: seo.title,
  ogTitle: seo.title,
  twitterTitle: seo.title,

  description: seo.description,
  ogDescription: seo.description,

  ogImage: seo.image,
  ogImageAlt: seo.imageAlt,

  articlePublishedTime: data.value?.createdAt,
  articleModifiedTime: data.value?.updatedAt,

  ogType: 'video.other',
  ogVideoSecureUrl: seo.video,
  ogVideoUrl: seo.video,
  ogVideo: seo.video,
  ogVideoWidth: 1280,
  ogVideoHeight: 720,
});

const isFavorited = computed(() => {
  return loggedIn.value && data.value.favs.some((x) => x.userId === user.value.id);
});
const fav = async () => {
  await $api(`/resource/${data.value.id}/fav`, { method: 'PATCH' });
  await refresh();
};

const { downloadFile, progress } = useFileDownload();
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
              <div class="text-sm text-muted z-60 flex items-center gap-1">
                <i18n-t keypath="common.by" />
                <template v-for="(author, index) in data.authors">
                  <template v-if="index !== 0 && index < data.authors.length - 1">,&nbsp;</template>
                  <template v-else-if="index !== 0 && index === data.authors.length - 1">&nbsp;&&nbsp;</template>
                  <ResourceAuthor :author="author" class="z-60" />
                </template>
              </div>
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
                <i18n-d :value="data.createdAt" format="medium" />
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
        <div class="flex flex-col gap-4">
          <UCard>
            <div class="flex flex-col gap-8">
              <UFieldGroup>
                <UButton :label="t('common.download')" icon="fas:download" class="w-full justify-center" size="xl" variant="solid" @click="downloadFile(data.id, data.fileName)" />
                <UButton :label="data.favs?.length" color="neutral" size="xl" @click="fav">
                  <template #trailing>
                    <UIcon name="fas:hearts" class="size-5 transition-colors" :class="[isFavorited ? 'text-red-400' : 'text-muted']" />
                  </template>
                </UButton>
              </UFieldGroup>

              <USeparator />
              {{ progress }}%
            </div>
          </UCard>
        </div>
      </UPageAside>
    </div>
  </UContainer>
</template>
