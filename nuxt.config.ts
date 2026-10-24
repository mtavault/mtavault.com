import * as fas from '@fortawesome/pro-solid-svg-icons';
import * as fab from '@fortawesome/free-brands-svg-icons';
import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/scripts', '@nuxt/ui', '@nuxtjs/i18n', '@nuxtjs/seo', '@vueuse/nuxt', 'motion-v/nuxt'],

  i18n: {
    defaultLocale: 'en',
    detectBrowserLanguage: {
      alwaysRedirect: true,
      redirectOn: 'all',
      fallbackLocale: 'en',
      cookieKey: 'mtavault-lang',
    },
    strategy: 'no_prefix',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'de', name: 'German', file: 'de.json' },
    ],
  },

  fonts: {
    families: [
      { name: 'Noto Sans', provider: 'google' },
      { name: 'Noto Sans Mono', provider: 'google' },
    ],
  },

  runtimeConfig: {
    public: {
      GIT_COMMIT: 'none',
      GIT_BRANCH: 'dev',
      GIT_DATE: '0000-01-01 00:00:00 +0000',

      api: '',
      cdn: '',
    },
    api: '',
  },

  robots: {
    blockNonSeoBots: true,
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  icon: {
    class: 'fa-fw',
    serverBundle: {
      externalizeIconsJson: true,
    },
    clientBundle: {
      scan: true,
      includeCustomCollections: false,
      icons: [],
    },

    mode: 'svg',
    customCollections: [
      {
        prefix: 'fas',
        icons: convertFaToIconify(fas),
      },
      {
        prefix: 'fab',
        icons: convertFaToIconify(fab),
      },
    ],
  },

  image: {
    providers: {
      cdn: {
        name: 'cdn',
        provider: './providers/mv-cdn.ts',
      },
    },
  },

  nitro: {
    preset: 'bun',
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
});

function convertFaToIconify(faPackage: Record<string, any>) {
  const icons: Record<string, any> = {};

  for (const key in faPackage) {
    const icon = faPackage[key];
    if (icon && icon.iconName && icon.icon) {
      const [width, height, , , svgPathData] = icon.icon;
      icons[icon.iconName] = {
        body: Array.isArray(svgPathData) ? svgPathData.map((d: string) => `<path fill="currentColor" d="${d}"/>`).join('') : `<path fill="currentColor" d="${svgPathData}"/>`,
        width,
        height,
      };
    }
  }
  return icons;
}
