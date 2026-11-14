import { useAbility } from '@casl/vue';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { fetch, ready, loggedIn, user } = useUserSession();
  const ability = useAbility();
  await fetch();

  if (!ready.value) {
    // Throw error
  }

  if (loggedIn.value) {
    console.log(user.value);
    ability.update(user?.value?.role?.rules || []);
  } else {
  }
});
