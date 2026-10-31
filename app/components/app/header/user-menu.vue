<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';

const { $api } = useNuxtApp();
const route = useRoute();
const config = useRuntimeConfig().public;
const { ready, loggedIn, user } = useUserSession();

const reqURL = useRequestURL();
const baseURL = 'https://discord.com/api/oauth2/authorize';
const redirectURL = new URL('login/oauth2', reqURL.protocol + '//' + reqURL.host);

const open = () => {
  const state = {
    token: crypto.randomUUID(),
    path: route.path,
  };

  const oauthURL = new URL(baseURL);
  oauthURL.searchParams.set('client_id', config.discordClientID);
  oauthURL.searchParams.set('redirect_uri', redirectURL.href);
  oauthURL.searchParams.set('response_type', 'code');
  oauthURL.searchParams.set('scope', 'identify email');
  oauthURL.searchParams.set('prompt', 'consent');
  oauthURL.searchParams.set('state', btoa(JSON.stringify(state)));

  localStorage.setItem('oauth-token', state.token);
  navigateTo(oauthURL.href, {
    external: true,
  });
};

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Profile',
      icon: 'fas:user',
    },
    {
      label: 'Settings',
      icon: 'fas:gear',
    },
  ],
  [
    {
      label: 'GitHub',
      icon: 'fab:github',
      to: 'https://github.com/mtavault',
      target: '_blank',
    },
    {
      label: 'API',
      icon: 'fas:cloud',
      disabled: true,
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'fas:right-from-bracket',
      color: 'error',
      onSelect: async () => {
        await $api('/auth/me', { method: 'DELETE' });
        reloadNuxtApp();
      },
    },
  ],
]);
</script>
<template>
  <div class="flex items-center gap-4">
    <UButton label="Login with Discord" icon="fab:discord" variant="solid" @click="open" v-if="ready && !loggedIn" />
    <template v-if="loggedIn"> </template>
    <UDropdownMenu :items="items" v-if="loggedIn">
      <UButton color="neutral" variant="ghost">
        <UUser :name="user.username" :avatar="{ src: `/media/.avatars/${user.id}.webp`, provider: 'cdn' }" description="Role Description" />
      </UButton>
    </UDropdownMenu>
  </div>
</template>
