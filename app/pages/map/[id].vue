<script lang="ts" setup>
const route = useRoute();
</script>
<template>
  <UContainer>
    {{ route.params }}
  </UContainer>
</template>
