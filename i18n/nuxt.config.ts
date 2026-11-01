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
      { code: 'cs-CZ', name: 'Czech', file: 'cs_CZ.json', flag: 'CZ' },
      { code: 'es-ES', name: 'Spanish', file: 'es_ES.json', flag: 'ES' },
      { code: 'fr-FR', name: 'French', file: 'fr_FR.json', flag: 'FR' },
      { code: 'hu-HU', name: 'Hungarian', file: 'hu_HU.json', flag: 'HU' },
      { code: 'pl-PL', name: 'Polish', file: 'pl_PL.json', flag: 'PL' },
      { code: 'pt-BR', name: 'Portuguese (Brazil)', file: 'pt_BR.json', flag: 'BR' },
      { code: 'pt-PT', name: 'Portuguese (Portugal)', file: 'pt_PT.json', flag: 'PT' },
      { code: 'ro-RO', name: 'Romanian', file: 'ro_RO.json', flag: 'RO' },
      { code: 'ru-RU', name: 'Russian', file: 'ru_RU.json', flag: 'RU' },
      { code: 'tr-TR', name: 'Turkish', file: 'tr_TR.json', flag: 'TR' },
    ],
  },
};
