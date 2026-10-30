<script lang="ts" setup>
const { t } = useI18n();
</script>
<template>
  <div class="relative isolate min-h-96 flex items-center py-16">
    <div class="absolute inset-0 -z-20 bg-cover bg-center blur-xs" style="background-image: url('/img/hero.webp'); mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), transparent 100%)" />

    <UContainer class="grid grid-cols-12">
      <div class="col-span-6">
        <div class="flex flex-col gap-16">
          <div class="flex flex-col">
            <p class="font-mono text-primary text-xs font-bold uppercase">> 2.671 resources</p>
            <h1 class="font-bold">{{ t('pages.discover.hero.title') }}</h1>
            <p class="text-muted ml-4 max-w-96">{{ t('pages.discover.hero.description') }}</p>
          </div>

          <div class="flex items-center gap-8">
            <UButton :label="t('pages.discover.hero.browse')" to="/search" icon="fas:objects-column" trailing-icon="fas:arrow-right" variant="solid" size="xxl" />
            <UButton :label="t('pages.discover.hero.share')" icon="fas:cloud-arrow-up" variant="outline" size="xxl" />
          </div>

          <div class="flex items-center gap-8">
            <div class="flex items-center gap-4">
              <UIcon name="fas:shield-check" class="size-8 text-primary" />
              <div class="flex flex-col">
                <p class="font-bold">{{ t('pages.discover.hero.features.safe.title') }}</p>
                <p class="text-muted text-sm">{{ t('pages.discover.hero.features.safe.description') }}</p>
              </div>
            </div>

            <USeparator orientation="vertical" class="h-10" />

            <div class="flex items-center gap-4">
              <UIcon name="fas:bolt" class="size-8 text-primary" />
              <div class="flex flex-col">
                <p class="font-bold">{{ t('pages.discover.hero.features.up-to-date.title') }}</p>
                <p class="text-muted text-sm">{{ t('pages.discover.hero.features.up-to-date.description') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-6">
        <HeroCarousel />
      </div>
    </UContainer>
  </div>
</template>
