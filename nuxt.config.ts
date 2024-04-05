// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@vueuse/motion/nuxt"],

  app: {
    head: {
      title: "Quadrant Cuts",
      meta: [{ name: "Sistem Cukur Santri SI", content: "Sistem Cukur Santri SI" }],
    },
  },
  ssr: false,

  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    public: {
      motion: {
        directives: {
          "pop-bottom": {
            initial: {
              scale: 0,
              opacity: 0,
              y: 100,
            },
            visible: {
              scale: 1,
              opacity: 1,
              y: 0,
            },
          },
        },
      },
    },
  },
});
