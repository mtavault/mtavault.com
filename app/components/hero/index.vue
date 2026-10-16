<script lang="ts" setup>
const { t } = useI18n();

function staggerMotion(index: number = 0) {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    inViewOptions: { once: true, amount: 1 },
    transition: { duration: 0.6, delay: index * 0.08 },
  };
}

function enterMotion(delay: number = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  };
}
</script>
<template>
  <UPageHero orientation="horizontal">
    <template #headline>
      <Motion v-bind="enterMotion(0.2)">
        <UBadge color="neutral" variant="soft" :label="t('pages.index.hero.headline')" class="rounded-full px-3 py-1.5 gap-1.5 bg-white/5 backdrop-blur-sm">
          <template #leading>
            <UChip inset standalone :ui="{ base: 'animate-pulse ring-0' }" />
          </template>
        </UBadge>
      </Motion>
    </template>

    <template #title>
      <Motion as="span" v-bind="enterMotion(0.35)" class="inline-block">
        {{ t('pages.index.hero.title') }}
      </Motion>
    </template>

    <template #description>
      <Motion as="span" v-bind="enterMotion(0.5)" class="inline-block">
        {{ t('pages.index.hero.description') }}
      </Motion>
    </template>

    <template #top>
      <Motion v-bind="staggerMotion(0)">
        <HeroShader class="absolute top-0 inset-x-0 opacity-15 h-full" />
      </Motion>

      <div
        class="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-2/3 h-1/2"
        style="background: radial-gradient(ellipse at center, color-mix(in oklch, var(--ui-primary) 6%, transparent) 0%, transparent 70%)"
      />
    </template>

    <HeroCarousel />
  </UPageHero>
</template>
