<script lang="ts" setup>
import * as _locales from '@nuxt/ui/locale';
const { t, locale, locales, setLocale } = useI18n();

const filteredLocales = Object.values(_locales).filter((x) => locales.value.some((y) => y.code === x.code));
</script>
<template>
  <ULocaleSelect :model-value="locale" @update:model-value="setLocale($event)" :locales="filteredLocales" :search-input="{ placeholder: t('input.placeholders.search') }" />
</template>
