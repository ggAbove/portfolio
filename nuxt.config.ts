// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-14',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    'nuxt-time',
  ],
  i18n: {
    defaultLocale: 'ru',
    strategy: 'prefix',
    bundle: {
      optimizeTranslationDirective: false,
    },
    locales: [{
      code: 'ru',
      name: 'Русский',
    }, {
      code: 'en',
      name: 'English',
    }],
  },
  eslint: {
    config: {
      autoInit: true,
      standalone: false,
    },
  },
  nitro: {
    preset: 'bun',
  },
  ui: {
    fonts: false,
    theme: {
      colors: ['primary'],
    },
  },
})
