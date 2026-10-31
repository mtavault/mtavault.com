<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';

const { t, locale, locales, setLocale } = useI18n();

const dropdownItems = computed<DropdownMenuItem>(() => {
  return locales.value.map((loc) => {
    return {
      label: loc.name,
      code: loc.code,
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
      <Flag :code="locale" />
    </UButton>
    <template #item-leading="{ item }">
      <Flag :code="item.code" />
    </template>
  </UDropdownMenu>
</template>
