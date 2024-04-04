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
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
        },
        {
          //  src: "https://api-maps.yandex.ru/v3/?apikey=7a61a60d-10c2-4b7b-8779-5101f3a5e2a0&lang=ru_RU",
        },
      ],
    },
  },
  modules: [
    "@nuxt/image",
    "nuxt-swiper",
    "nuxt-primevue",
    "vue-yandex-maps/nuxt",
    "@pinia/nuxt",
  ],
  yandexMaps: {
    apikey: "7a61a60d-10c2-4b7b-8779-5101f3a5e2a0",
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

});
