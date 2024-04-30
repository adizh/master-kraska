// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/assets/globals.scss" as *;
          @use "~/assets/mixins.scss" as *;
        `,
        },
      },
    },
  },
  build: {},

  app: {
    head: {
      link: [
        // {
        //   rel: "stylesheet",
        //   href: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
        // },
        // {
        //   rel: "stylesheet",
        //   href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
        // },
      ],
      script: [
        // {
        //   src: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
        // },
      ],
    },
  },

  modules: [
    "@nuxt/image",
    "nuxt-swiper",
    "nuxt-primevue",
    "@pinia/nuxt",
    "usebootstrap",
    "nuxt-snackbar",
    "@nuxtjs/i18n",
    "nuxt3-leaflet",
    "@nuxtjs/seo",
    "@vueuse/nuxt"

  ],
  seo:{
    automaticDefaults:true,
    splash:true
  },
  i18n: {
    vueI18n: "./i18n/i18n.config.ts",
  },
  snackbar: {
    bottom: true,
    right: true,
    duration: 5000,
  },

  $development: {
    image: {
      dir: "assets/images",
    },
  },
  $production: {
    image: {
      provider: "ipx",
    },
  },
  routeRules: {
    "/": { prerender: true },
  },
});
