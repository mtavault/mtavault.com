export default defineNuxtRouteMiddleware(async (to, from) => {
  const { fetch, ready, loggedIn } = useUserSession();
  await fetch();

  if (ready.value && !loggedIn.value) {
  }
});
