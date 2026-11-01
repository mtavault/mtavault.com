import type { DefaultDateTimeFormatSchema } from 'vue-i18n';

const defaultDTFormat: DefaultDateTimeFormatSchema = {
  short: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },

  medium: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },

  long: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
};

export default defineI18nConfig(() => ({
  fallbackLocale: 'en-US',
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  missingWarn: false,
  fallbackWarn: false,

  datetimeFormats: {
    'en-US': defaultDTFormat,
    'de-DE': defaultDTFormat,
    'cs-CZ': defaultDTFormat,
    'es-ES': defaultDTFormat,
    'fr-FR': defaultDTFormat,
    'hu-HU': defaultDTFormat,
    'pl-PL': defaultDTFormat,
    'pt-BR': defaultDTFormat,
    'pt-PT': defaultDTFormat,
    'ro-RO': defaultDTFormat,
    'ru-RU': defaultDTFormat,
    'tr-TR': defaultDTFormat,
  },
}));
