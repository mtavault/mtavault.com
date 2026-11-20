import { toValue, type MaybeRefOrGetter } from 'vue';

export function useResource(id: MaybeRefOrGetter<string>) {
  const resultId = computed(() => toValue(id));
  const { $api } = useNuxtApp();

  return useAsyncData(
    () => `resource-${resultId.value}`,
    () => $api(`/resource/${resultId.value}`),
  );
}
