<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';

const { t, locale, localeProperties, locales, setLocale } = useI18n();

const dropdownItems = computed<DropdownMenuItem>(() => {
  return locales.value.map((loc) => {
    return {
      label: loc.name,
      flag: loc.flag,
      onSelect: () => {
        setLocale(loc.code);
      },
    };
  });
});
</script>
<template>
  <UDropdownMenu :items="dropdownItems">
    <UButton color="neutral" variant="ghost">
      <Flag :code="localeProperties.flag" />
    </UButton>
    <template #item-leading="{ item }">
      <Flag :code="item.flag" />
    </template>
  </UDropdownMenu>
</template>
