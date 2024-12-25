// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
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
  ui: {
    theme: {
      colors: ['primary'],
    },
  },
})
