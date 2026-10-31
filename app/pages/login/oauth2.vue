<script lang="ts" setup>
import { FetchError } from 'ofetch';
import vAutoAnimate from '@formkit/auto-animate';

definePageMeta({
  layout: 'blank',
});

useHead({
  title: 'OAuth2',
});

const { $api } = useNuxtApp();
const route = useRoute();
const toast = useToast();

const ready = ref(false);

const { code, state } = route.query;
if (!code || !state) {
  throw createError({ statusCode: 400, statusMessage: 'bad request.' });
}

const decodedState = JSON.parse(atob(state as string));
const { token, path } = decodedState;

const storedToken = localStorage.getItem('oauth-token');
if (!token || !token?.length || !storedToken || !storedToken?.length || token !== storedToken) {
  throw createError({ statusCode: 400, statusMessage: 'invalid response (possible csrf attack)' });
}
localStorage.removeItem('oauth-token');

try {
  const requestURL = useRequestURL();
  await $api('/auth/oauth', {
    method: 'POST',
    body: {
      code,
      redirect_uri: requestURL.protocol + '//' + requestURL.host + requestURL.pathname,
    },
  });
} catch (err) {
  let description: string = 'Unknown Reason';

  if (err instanceof FetchError) {
    if (err.statusText) description = `${err.statusText} (code:${err.statusCode})`;
  }

  toast.add({
    id: 'oauth-error',
    color: 'error',
    title: 'Identification Failed',
    icon: 'fas:user-key',
    description,
  });
} finally {
  ready.value = true;
  setTimeout(() => {
    navigateTo(path);
  }, 2000);
}
</script>
<template>
  <div class="flex flex-col items-center justify-center flex-1" v-auto-animate>
    <div class="max-w-96 flex items-center flex-col">
      <AppHeaderLogo />
      <Loader />
    </div>
  </div>
</template>
