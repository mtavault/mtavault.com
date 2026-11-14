<script lang="ts" setup>
const { t } = useI18n();

const navItems = computed(() => [
  {
    label: t('navigation.home'),
    to: '/',
    icon: 'fas:house',
    exact: true,
  },
  {
    label: t('navigation.search'),
    to: '/search',
    icon: 'fas:magnifying-glass',
  },
]);
</script>
<template>
  <UHeader>
    <template #left>
      <AppHeaderLogo />
    </template>

    <UNavigationMenu variant="pill" highlight :items="navItems" />

    <template #body>
      <UNavigationMenu orientation="vertical" :items="navItems" />
    </template>

    <template #right>
      <UButton to="/create" icon="fas:plus" variant="ghost" />
      <AppHeaderLocaleSelect />
      <AppHeaderUserMenu />
    </template>
  </UHeader>
</template>
