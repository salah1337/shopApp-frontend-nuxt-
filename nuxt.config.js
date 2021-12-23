import colors from 'vuetify/es5/util/colors'

export default {
  render: {
    csp: {
      hashArgorism: 'sha256',
      policies: {
        'script-src': [
          "'sha256-4RS22DYeB7U14dra4KcQYxmwt5HkOInieXK1NUMBmQI='" // this line resolves the violation
        ]
      }
    }
  },
  target: 'static',
  ssr: false,
  env: {
    apiUrl: process.env.API_URL || 'http://localhost:6969',
  },
  /*
  ** Headers of the page
  */
  head: {
    script: [
      { src: 'https://js.stripe.com/v3/' }
      // { src: 'https://js.stripe.com', type: 'text/javascript', body: true }
    ],
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#F09376' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src:'~/plugins/vue-notifications', ssr:false},
    {src: '~/plugins/validation', ssr:false},
    '~/plugins/cart-utils',
    '~/plugins/axios-utils',
    '~/plugins/roles-utils',
    '~/plugins/loading-overlay',
    '~/plugins/preloader',
    '~/plugins/timeSince',
    '~/plugins/searchBar',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources',
    'nuxt-fontawesome',
    '@nuxtjs/dotenv'
  ],

  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
    ]
  },

  styleResources: {
    scss: [
        '~/assets/scss/base.scss',
    ]
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // 'nuxt-validate',
    'nuxt-i18n',
    'bootstrap-vue/nuxt',
    // ['stripe-nuxt', 'pk_test_51HHY7iC209mGcTriS8H6PP4xevgOtvZYzqUTQmqjTRUAQDZkecKo9TstcxqLojzKngnC51Z1SrQ88vnRT3uBoXJc007AVKMcBb'],
  ],

  i18n: {
    locales: [    
      {
        code: 'en',
        iso: 'en-US'
      },
      {
        code: 'fr',
        iso: 'fr-FR'
      }
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected'
    },
    // baseUrl: 'https://my-nuxt-app.com',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./static/locales/en.json'),
        fr: require('./static/locales/fr.json')
      }
    },
  },
  axios:{
    baseURL: process.env.API_URL || 'http://localhost:6969'
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    defaultAssets: {
      font: true,
      icons: 'fa'
    },
    icons: {
      iconfont: 'fa',
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
   vendor: [
    //...
    'moment',
    'vee-validate'
    //...
    ],
    extend (config, ctx) {
    },
    transpile: ['vue-notifications']
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/login', method: 'post', propertyName: 'access_token'},
          logout: { url: '/api/logout', method: 'post'},
          user: { url: '/api/customer/user', method: 'get', propertyName: 'data.user'},
        }
      }
    }
  }
}
