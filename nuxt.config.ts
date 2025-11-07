import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    public: {
      BACKEND_URL: process.env.BACKEND_URL || ''
    }
    ,googleFontsApiKey: process.env.GOOGLE_FONTS_API_KEY || ''
  },
  devtools: { enabled: true },
  pages: true,
  css: [
    '@/assets/css/fonts.css'
  ],
  plugins: ['~/plugins/fontawesome_plugin.ts'],
  modules: ["@nuxtjs/tailwindcss", '@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Roboto: true, // all default weights
      'Open Sans': [400, 700],
      Lato: { wght: [100, 400, 700], ital: [400] }
    },
    display: 'swap',
    preconnect: true,
    prefetch: true,
    preload: true,
    download: true,
    inject: true
  },
        
  app: {
    head: {
      script: [
        {
          src: 'https://kit.fontawesome.com/14ace737c0.js',
          crossorigin: 'anonymous'
        }
      ],
      link: [
        {
          rel: 'preload',
          href: '/fonts/Canela-Bold.ttf',
          as: 'font',
          type: 'font/ttf',
          crossorigin: 'anonymous'
        }
      ]
    }
  }
})