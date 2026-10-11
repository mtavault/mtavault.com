<script lang="ts" setup>
const { t } = useI18n();

const navItems = computed(() => [
  {
    label: t('navigation.home'),
    to: '/',
    icon: 'fas:house',
  },
]);
</script>
<template>
  <UHeader>
    <template #left>
      <AppHeaderLogo />
    </template>

    <UNavigationMenu variant="pill" highlight :items="navItems" />

    <template #right>
      <AppHeaderLocaleSelect />
    </template>
  </UHeader>
</template>
