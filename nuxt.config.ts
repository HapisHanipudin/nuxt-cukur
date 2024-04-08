// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@vueuse/motion/nuxt", "nuxt-primevue"],
  primevue: {},
  app: {
    head: {
      title: "Dream Cuts",
      meta: [{ name: "Sistem Cukur Santri SI", content: "Sistem Cukur Santri SI" }],
    },
  },
  ssr: false,

  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  },
});
