<script lang="ts" setup>
const config = useRuntimeConfig();
</script>
<template>
  <UFooter>
    <template #left>
      <div class="flex flex-col">
        <p class="text-sm text-muted">mtavault.com • © {{ new Date().getFullYear() }}</p>
        <span class="font-mono text-muted text-xs"> {{ config.public.GIT_BRANCH }}.{{ config.public.GIT_COMMIT }}.{{ config.public.GIT_DATE }}</span>
      </div>
    </template>

    <template #right>
      <UButton to="https://github.com/mtavault/" target="_blank" icon="fab:github" aria-label="GitHub" color="neutral" variant="ghost" />
    </template>
  </UFooter>
</template>
