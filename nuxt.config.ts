// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  experimental: {
    renderJsonPayloads: false
  },

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
  // <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
//<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      script: [
        {
          src: "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
        },
      
       
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          hid: "icon",
          href: "/favicon.ico",
          sizes: "16x16"
        },
    
      ]
    }
  },

  modules: [
    "@nuxt/image",
    "nuxt-swiper",

    "nuxt-primevue",
    "@pinia/nuxt",

    "nuxt-snackbar",
    "@nuxtjs/i18n",
    "nuxt3-leaflet",
    "@nuxtjs/seo",
    "@vueuse/nuxt",

  ],

  site: {
    url: "https://masterkraska.kg"
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

  // routeRules: {
  //   "/": { prerender: true },
  // },
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
