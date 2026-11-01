<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';

const { t, locale, localeProperties, locales, setLocale } = useI18n();

const isSwitching = ref(false);
const dropdownItems = computed<DropdownMenuItem>(() => {
  return locales.value.map((loc) => {
    return {
      label: loc.name,
      flag: loc.flag,
      onSelect: async () => {
        isSwitching.value = true;
        await setLocale(loc.code);
        isSwitching.value = false;
      },
    };
  });
});
</script>
<template>
  <UDropdownMenu :items="dropdownItems">
    <UButton color="neutral" variant="ghost" :loading="isSwitching">
      <Flag :code="localeProperties.flag" />
    </UButton>
    <template #item-leading="{ item }">
      <Flag :code="item.flag" />
    </template>
  </UDropdownMenu>
</template>
