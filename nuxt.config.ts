import { appDescription } from './constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@nuxthq/studio',
    '@nuxtjs/seo',
  ],
  ssr: true,
  content: {
    // documentDriven: true,
    // markdown: {
    //   toc: {
    //     depth: 2,
    //     searchDepth: 3,
    //   },
    // },
    highlight: {
      // Theme used in all color schemes.
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai',
      },
    },
    api: {
      baseURL: '/_api/content',
    },
    // experimental: {
    //   clientDB: true,
    // },
  },
  robots: {
    disallow: ['/secret', '/admin'],
  },
  sitemap: {
    strictNuxtContentPaths: true,
  },
  ogImage: {
    componentOptions: {
      global: true,
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'dark', // will render in light mode
    classSuffix: '',
  },
  linkChecker: { enabled: false },

  site: {
    url: 'https://vio.vin',
    name: '薇尔薇',
    description: 'A Web Developer. Code for Fun. AKA ZZSLL, Violet, Vio, VioVin, Lnbiuc, kunkida, hi@lnbiuc.com',
    defaultLocale: 'en',
    identity: {
      type: 'Person',
    },
    github: 'lnbiuc',
    email: 'hi@lnbiuc.com',
    trailingSlash: true,
    twitterCard: 'summary_large_image',
    twitterSite: '@ZZSLL_53387',
    twitterCreator: '@ZZSLL_53387',
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    // payloadExtraction: false,
    // renderJsonPayloads: true,
    // typedPages: true,
    // asyncContext: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    // prerender: {
    //   // https://github.com/nuxt-themes/docus/issues/944#issuecomment-1634580369
    //   concurrency: 1,
    //   // https://github.com/nuxt-themes/docus/issues/944#issuecomment-1634798275
    //   failOnError: false,
    // },
    // prerender: {
    //   crawlLinks: false,
    //   routes: ['/'],
    //   ignore: ['/hi'],
    // },
    prerender: {
      routes: [
        '/',
        '/shorts',
        '/blog',
        '/project',
        '/about',
        '/short/bos-plugin-template',
        '/article/use-nuxt-content',
      ],
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/favicon.ico' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      // umami analytics
      script: [
        // <script async src="https://analytics.eu.umami.is/script.js" data-website-id="afdca035-1988-40f8-89a0-e9ed73267348"></script>
        // { 'async': true, 'src': 'https://analytics.eu.umami.is/script.js', 'data-website-id': 'afdca035-1988-40f8-89a0-e9ed73267348' },
      ],
      titleTemplate: '%s %separator %siteName',
    },
  },

  devtools: {
    enabled: true,
  },

  hooks: {
    // Related to https://github.com/nuxt/nuxt/pull/22558
    // Adding all global components to the main entry
    // To avoid lagging during page navigation on client-side
    'components:extend': function (components) {
      for (const comp of components) {
        if (comp.global)
          comp.global = 'sync'
      }
    },
  },
})
