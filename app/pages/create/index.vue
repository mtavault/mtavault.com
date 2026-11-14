<script lang="ts" setup>
import { vAutoAnimate } from '@formkit/auto-animate';
import type { StepperItem } from '@nuxt/ui';

const { user } = useUserSession();

useHead({
  title: 'Create Resource',
});

const currentStep = ref(0);
const items = ref<StepperItem[]>([
  {
    title: 'General',
    icon: 'fas:hashtag',
    slot: 'general' as const,
  },
  {
    title: 'Description',
    icon: 'fas:paragraph',
    slot: 'description' as const,
  },
  {
    title: 'Upload',
    icon: 'fas:files',
    slot: 'upload' as const,
  },
]);

const variants = [
  {
    label: 'Map',
    value: 'map',
    icon: 'fas:map-location-dot',
  },
  {
    label: 'Resource',
    value: 'resource',
    icon: 'fas:box-isometric',
  },
  {
    label: 'Model',
    value: 'model',
    icon: 'fas:draw-polygon',
  },
];

const mapGamemodes = [
  {
    label: 'Deathmatch',
    value: 'dm',
  },
  {
    label: 'Race',
    value: 'race',
  },
  {
    label: 'Derby',
    value: 'dd',
  },
  {
    label: 'Shooter',
    value: 'shooter',
  },
  {
    label: 'Capture the Flag',
    value: 'ctf',
  },
];

const resourceTypes = [
  {
    label: 'Tool',
    value: 'tool',
  },
  {
    label: 'Gamemode',
    value: 'gamemode',
  },
  {
    label: 'Misc',
    value: 'misc',
  },
];

const res = ref({
  variant: 'map',
  name: undefined,
  authors: [],
  summary: undefined,
  videoID: undefined,
  gamemode: undefined,
  resourceType: undefined,
  allowComments: true,
  unlisted: false,
});

const oembed = ref(null);

watch(
  () => res.value.videoID,
  async () => {
    if (res.value.videoID.length !== 11) {
      oembed.value = null;
      return;
    }
    oembed.value = await $fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${res.value.videoID}&format=json`);
  },
);

const isVariant = (...args) => args.includes(res.value.variant);
</script>
<template>
  <UContainer>
    <UStepper v-model="currentStep" :items="items" disabled>
      <template #general>
        <UCard>
          <UForm class="grid grid-cols-12 gap-8 items-start" v-auto-animate>
            <UFormField label="Variant" required class="col-start-1 col-span-4">
              <URadioGroup v-model="res.variant" :items="variants" variant="table" orientation="horizontal" indicator="hidden" :ui="{ wrapper: 'flex-row' }" size="lg" />
            </UFormField>
            <UFormField label="Name" required class="col-start-1 col-span-4">
              <UInput v-model="res.name" class="w-full" size="xl" />
            </UFormField>

            <UFormField label="Authors" required class="col-start-1 col-span-4">
              <UInputTags v-model="res.authors" class="w-full" size="xl" />
            </UFormField>

            <UFormField label="Summary" description="Must be written in English." class="col-span-8 col-start-1">
              <UInput v-model="res.summary" class="w-full" size="xl" />
            </UFormField>

            <UFormField label="YouTube Video ID" class="col-span-4 col-start-1" v-if="isVariant('resource', 'map')">
              <UInput v-model="res.videoID" placeholder="dQw4w9WgXcQ" minlength="11" maxlength="11" class="w-full" size="xl" />
              <template #help v-if="oembed">
                <div class="flex flex-col">
                  <ULink :to="oembed?.author_url" external>@{{ oembed?.author_name }}</ULink>
                  <span>{{ oembed?.title }}</span>
                </div>
              </template>
            </UFormField>

            <UFormField label="Gamemode" class="col-span-4 col-start-1" required v-if="isVariant('map')">
              <USelect v-model="res.gamemode" :items="mapGamemodes" placeholder="Select Gamemode" />
            </UFormField>

            <UFormField label="Resource Type" class="col-span-4 col-start-1" v-if="isVariant('resource')">
              <USelect v-model="res.resourceType" :items="resourceTypes" placeholder="Select Resource Type" />
            </UFormField>

            <UCheckbox v-model="res.allowComments" label="Allow Comments" class="col-start-1 col-span-full" size="lg" />
            <UCheckbox
              v-model="res.unlisted"
              label="Unlisted"
              description="Will not appear in search or on your profile, but can be shared via direct link. You can change this anytime."
              class="col-start-1 col-span-full"
              size="lg"
            />
          </UForm>
        </UCard>
      </template>
    </UStepper>
  </UContainer>
</template>
