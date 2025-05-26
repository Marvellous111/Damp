// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  
  devtools: {
    enabled: false
  },


  runtimeConfig: {
    public: {
      reown_project_id: process.env.NUXT_PUBLIC_REOWN_PROJECT_ID
    },
    server: {
      okxApiKey: process.env.OKX_DAMP_API_KEY,
      okxSecretKey: process.env.OKX_DAMP_API_KEY_SECRET,
      okxPassphrase: process.env.OKX_DAMP_API_PASSPHRASE,
    },
    
  },

  css: [
    "~/assets/styles/main.scss"
  ],

  // plugins: [
  //   // '~/plugins/appkit.client.ts',
  //   '~/plugins/gsap.ts'
  // ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-lucide-icons',
    'nuxt-svgo',
  ]
})