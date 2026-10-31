export const useUserSession = () => {
  const { $api } = useNuxtApp();
  const requestFetch = useRequestFetch();
  const readyState = useState('mv-auth-ready', () => false);
  const user = useState('mv-session', () => null);

  const fetch = async () => {
    try {
      user.value = await $api('/auth/me', {
        headers: {
          accept: 'application/json',
        },
      });
    } catch (err) {}
    if (!readyState.value) {
      readyState.value = true;
    }
    return;
  };

  const clear = async (): Promise<void> => {
    user.value = null;
  };

  return {
    loggedIn: computed(() => Boolean(user.value)),
    ready: computed(() => readyState.value),
    user: computed(() => user.value),
    clear,
    fetch,
  };
};
