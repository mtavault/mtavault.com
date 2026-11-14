import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { abilitiesPlugin } from '@casl/vue';

export default defineNuxtPlugin((nuxtApp) => {
  const builder = new AbilityBuilder(createMongoAbility);
  const { can, cannot } = builder;
  can('read', 'all');
  nuxtApp.vueApp.use(abilitiesPlugin, builder.build(), {
    useGlobalProperties: true,
  });
});
