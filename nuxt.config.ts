import { madrasah } from './app/config/madrasah'

export default defineNuxtConfig({

  modules: ['@nuxt/ui', '@nuxt/eslint'],
  components: [{ path: '~/components', pathPrefix: false }],
  devtools: { enabled: false },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: `${madrasah.name} | Qur'an, Arabic & Islamic Studies`,
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: madrasah.description },
        { name: 'theme-color', content: '#123C2F' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
    pageTransition: false,
  },

  css: ['~/assets/css/main.css'],

  ui: {
    fonts: false,
  },

  runtimeConfig: {
    public: {
      // Optional build-time override, for example NUXT_PUBLIC_SITE_URL.
      siteUrl: '',
    },
  },

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2026-01-01',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/robots.txt'],
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  icon: {
    serverBundle: {
      collections: ['lucide'],
    },
    clientBundle: {
      scan: true,
      sizeLimitKb: 512,
    },
  },
})
