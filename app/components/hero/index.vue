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
  <UPageHero orientation="vertical">
    <template #top>
      <Motion v-bind="staggerMotion(0)">
        <HeroShader class="absolute top-0 inset-x-0 opacity-15 h-full" />
      </Motion>

      <div
        class="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-2/3 h-1/2"
        style="background: radial-gradient(ellipse at center, color-mix(in oklch, var(--ui-primary) 6%, transparent) 0%, transparent 70%)"
      />
    </template>

    <div class="flex flex-col">
      <Motion as="span" v-bind="enterMotion(0.35)" class="inline-block text-4xl font-bold">
        {{ t('pages.index.hero.title') }}
      </Motion>
      <Motion as="span" v-bind="enterMotion(0.5)" class="inline-block text-muted">
        {{ t('pages.index.hero.description') }}
      </Motion>
    </div>

    <HeroCarousel />
  </UPageHero>
</template>
