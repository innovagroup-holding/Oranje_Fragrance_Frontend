export default {
  generate: {
    fallback: true,
  },

  server: {
    port: 3001,
  },

  target: "static", // default is 'server'

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Oranje Fragrance",
    titleTemplate: "Oranje | %s",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/scss/style.scss", "~/assets/css/animation.css"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/vue-awesome-swiper.js",
    "~/plugins/vuejs-pagiante.js",
    "~/plugins/observe-visibility.js",
    "~/plugins/persistedState.client.js",
    {
      src: "~/plugins/bootstrap.js",
      mode: "client",
    },
    {
      src: "~/plugins/vue-js-modal",
      mode: "client",
    },
    {
      src: "~/plugins/notifications-client.js",
      mode: "client",
    },
    { src: "@/plugins/aos", mode: "client" },
    { src: "@/plugins/marquee", mode: "client" },
  ],
  purgeCSS: {
    whitelist: [
      "aos-init",
      "aos-animate",
      "data-aos-delay",
      "data-aos-duration",
      "fade-up",
      "zoom-in",
    ],
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/style-resources", "@nuxtjs/axios"],

  styleResources: {
    scss: ["~/assets/scss/_variables.scss"],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    extend(config, ctx) {},
    babel: {
      compact: true,
    },
  },

  axios: {
    baseURL: "https://phplaravel-1239567-4860975.cloudwaysapps.com/api/", // Used as fallback if no runtime config is provided
  },
};
