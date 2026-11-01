import type { NuxtConfig } from 'nuxt/schema';

export const i18nNuxtConfig: NuxtConfig = {
  i18n: {
    defaultLocale: 'en-US',

    detectBrowserLanguage: {
      alwaysRedirect: true,
      redirectOn: 'all',
      fallbackLocale: 'en-US',
      cookieKey: 'mtavault-lang',
    },

    strategy: 'no_prefix',
    locales: [
      { code: 'en-US', name: 'English', file: 'en_US.json', flag: 'GB' },
      { code: 'de-DE', name: 'German', file: 'de_DE.json', flag: 'DE' },
    ],
  },
};
