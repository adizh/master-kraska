// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
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

  $development: {
    image: {
      dir: "assets/images"
    }
  },
  $production: {
    image: {
      provider: "ipx"
    }
  },
  routeRules: {
    "/": { prerender: true }
  }
});
