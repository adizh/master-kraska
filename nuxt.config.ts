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
      ],
    },
  },

  modules: ["@nuxt/image", "nuxt-swiper"],
  image: {
    dir: "assets/images",
  },
});
