// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  vite: {
    esbuild: {
      drop: ["debugger"],
      pure: [
        "console.log",
        "console.error",
        "console.warn",
        "console.debug",
        "console.trace"
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/assets/globals.scss" as *;
          @use "~/assets/mixins.scss" as *;
        `
        }
      }
    }
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      script: [
        {
          src: "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
        },
        {
          src: 'https://cdn-ru.bitrix24.ru/b27013162/crm/site_button/loader_2_gi1nb6.js'
        }
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          hid: "icon",
          href: "/favicon.ico",
          sizes: "16x16"
        }
      ]
    }
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
  site: {
    url: "https://test"
  },
  seo: {
    automaticDefaults: true,
    splash: true
  },
  i18n: {
    vueI18n: "./i18n/i18n.config.ts"
  },
  snackbar: {
    bottom: true,
    right: true,
    duration: 5000
  },

  routeRules: {
    "/": { prerender: true }
  },
  runtimeConfig: {
    public: {}
  },
  $development: {
    image: {
      dir: "assets/images"
    }
  },
  $production: {
    image: {
      provider: "ipx"
    }
  }
});
