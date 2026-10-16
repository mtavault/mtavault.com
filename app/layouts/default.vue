<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <UMain class="flex-1 min-h-0">
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">mtavault.com • © {{ new Date().getFullYear() }}</p>
      </template>

      <template #right>
        <UButton to="https://github.com/mtavault/" target="_blank" icon="fab:github" aria-label="GitHub" color="neutral" variant="ghost" />
      </template>
    </UFooter>
  </div>
</template>
