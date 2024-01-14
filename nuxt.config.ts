import { appDescription } from './constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
  ],
  ssr: true,
  content: {
    documentDriven: true,
    markdown: {
      toc: {
        depth: 2,
        searchDepth: 3,
      },
    },
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
    // experimental: {
    //   clientDB: true,
    // },
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      // https://github.com/nuxt-themes/docus/issues/944#issuecomment-1634580369
      concurrency: 1,
      // https://github.com/nuxt-themes/docus/issues/944#issuecomment-1634798275
      failOnError: false,
    },
    // prerender: {
    //   crawlLinks: false,
    //   routes: ['/'],
    //   ignore: ['/hi'],
    // },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'stylesheet', href: '//unpkg.com/heti/umd/heti.min.css' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      // umami analytics
      script: [
        // <script async src="https://analytics.eu.umami.is/script.js" data-website-id="afdca035-1988-40f8-89a0-e9ed73267348"></script>
        { 'async': true, 'src': 'https://analytics.eu.umami.is/script.js', 'data-website-id': 'afdca035-1988-40f8-89a0-e9ed73267348' },
      ],
    },
  },

  devtools: {
    enabled: true,
  },
})
