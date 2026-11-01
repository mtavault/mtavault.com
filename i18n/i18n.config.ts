export default defineI18nConfig(() => ({
  fallbackLocale: 'en-US',
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  missingWarn: false,
  fallbackWarn: false,

  datetimeFormats: {
    'en-US': {
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
    },

    'de-DE': {
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
    },
  },
}));
