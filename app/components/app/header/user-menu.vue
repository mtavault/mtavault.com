<script lang="ts" setup>
const { ready, loggedIn } = useUserSession();
</script>
<template>
  <UButton label="Login with Discord" icon="fab:discord" variant="solid" v-if="ready && !loggedIn" />
</template>
