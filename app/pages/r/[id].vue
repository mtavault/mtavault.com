<script lang="ts" setup>
const route = useRoute();
const { t, localeProperties } = useI18n();
const { $api } = useNuxtApp();
const img = useImage();
const { user, loggedIn } = useUserSession();
const toast = useToast();
const { downloadFile, progress, completed, error: downloadError, downloading } = useFileDownload();

const { data, refresh, error } = await useAsyncData(`resource-${route.params.id}`, () => $api(`/resource/${route.params.id}`));

if (error.value || !data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Map not found',
  });
}

const selectedVersion = ref(data.value.isDownloadable && data.value.versions.length ? data.value.versions.at(-1).number : undefined);

const seo = {
  title: data.value.name,
  description: `by ${new Intl.ListFormat('en', { style: 'short' }).format(data.value.authors.map((x) => x.name))}`,
  image: data.value.videoID ? img(`/${data.value.id}/images/yt-preview.webp`, {}, { provider: 'cdn' }) : undefined,
  imageAlt: data.value.videoID ? img(`/${data.value.id}/images/yt-thumbnail.jpg`, {}, { provider: 'cdn' }) : undefined,
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

const downloadMap = async () => {
  try {
    await downloadFile(data.value.id, data.value.fileName);
  } catch (err) {
    toast.add({
      color: 'error',
      title: 'Download Failed',
      description: downloadError.value || 'Unknown Error',
      icon: 'fas:user-robot-xmarks',
    });
  }
};

const createGif = async () => {
  await $api(`/resource/${data.value.id}/preview`, { method: 'PUT' });
};
</script>
<template>
  <UContainer>
    <div class="flex flex-col lg:grid lg:grid-cols-12 gap-4">
      <div class="max-lg:col-span-full lg:col-span-9 md:p-4 flex flex-col gap-4">
        <UButton label="Do" @click="createGif" loading-auto />
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
            <ul class="flex justify-between gap-4">
              <li>
                <UUser :avatar="{ icon: 'fas:eye' }" :description="Intl.NumberFormat('en-us', { notation: 'compact' }).format(data.views)" />
              </li>
              <li>
                <UUser :avatar="{ icon: 'fas:download' }" :description="Intl.NumberFormat('en-us', { notation: 'compact' }).format(data.downloads)" />
              </li>
              <li>
                <UUser :avatar="{ icon: 'fas:hearts' }" :description="data.favs?.length || '0'" />
              </li>
              <li>
                <UUser :avatar="{ icon: 'fas:award' }" :description="data.awardCount || '0'" />
              </li>
              <li>
                <UUser :avatar="{ icon: 'fas:calendar-days' }">
                  <template #description>
                    <i18n-d :value="data.createdAt" format="medium" />
                  </template>
                </UUser>
              </li>
            </ul>
          </div>

          <div class="ml-auto flex items-center">
            <!-- Like Button -->
            <UButton :label="data.favs?.length" color="neutral" variant="soft" size="xl" @click="fav" loading-auto>
              <template #leading>
                <UIcon name="fas:hearts" class="size-6" :class="[isFavorited ? 'text-red-400' : 'text-muted']" />
              </template>
            </UButton>
          </div>
        </div>

        <!-- Content Container -->
        <template v-if="data.type === 'model'">
          <div class="aspect-video border border-default rounded-lg">3d scene</div>
        </template>
        <Youtube :id="data.videoID" class="aspect-video w-full rounded-lg border border-default" v-if="data.videoID" />
      </div>
      <div class="max-lg:col-span-full lg:col-span-3 md:p-4">
        <div class="flex flex-col gap-4">
          <!-- Download Card -->
          <UPageCard @click="downloadMap" class="cursor-pointer" v-if="data.isDownloadable && data.versions.length">
            <div class="flex items-center gap-4">
              <UIcon name="fas:download" class="size-6 text-primary" />
              <div class="flex flex-col">
                <span class="font-bold">Download</span>
                <span class="text-xs text-muted font-mono">22.21mb</span>
              </div>
              <div class="ml-auto">
                <USelect v-model="selectedVersion" :items="data.versions" label-key="number" value-key="number" v-if="data.versions.length > 1">
                  v{{ selectedVersion }}
                  <template #item-label="{ item }"> v{{ item.number }} </template>
                </USelect>
                <UBadge :label="`v${data.versions.at(-1).number}`" variant="soft" color="neutral" size="lg" v-else />
              </div>
            </div>
          </UPageCard>

          <!-- Data Card -->
          <UPageCard>
            <div class="flex flex-col gap-8">
              <ul class="flex flex-col gap-4">
                <li>
                  <UUser :avatar="{ icon: 'fas:tags' }" name="Tags" :description="data.tags.join(', ')" />
                </li>
                <li>
                  <UUser :avatar="{ icon: 'fas:cubes' }" name="Objects" :description="data.meta?.total_objects" v-if="data.type === 'map'" />
                </li>
                <li>
                  <UUser :avatar="{ icon: 'fas:clock' }" name="Time" :description="data.meta?.time" v-if="data.type === 'map'" />
                </li>
                <li>
                  <UUser :avatar="{ icon: 'fas:cloud' }" name="Weather" :description="gtasaWeathers(data.meta?.weather) + ` (id: ${data.meta?.weather})`" v-if="data.type === 'map'" />
                </li>
                <li>
                  <UUser :avatar="{ icon: 'fas:cars' }" name="Vehicles" :description="data.meta?.vehicles.map((x) => gtasaVehicles[x].name).join(', ')" v-if="data.type === 'map'" />
                </li>
              </ul>
            </div>
          </UPageCard>

          <!-- Most Used Objects Card -->
          <UPageCard icon="fas:cubes" title="Most Used Objects" v-if="data.type === 'map' && data.meta?.objects">
            <UPageList>
              <UScrollArea class="max-h-96">
                <UPageCard v-for="object in data.meta.objects">
                  {{ object.id }}
                  {{ object.amount }}
                </UPageCard>
              </UScrollArea>
            </UPageList>
          </UPageCard>
        </div>
      </div>
    </div>
  </UContainer>
</template>
