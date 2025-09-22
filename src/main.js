import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import EN from '@/languages/en.json'
import AR from '@/languages/ar.json'
import numberFormat from '@/lib/numberFormatFilter'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import VueViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

axios.defaults.baseURL = import.meta.env.VITE_DISTRIBEX_API

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  lobalInjection: true,
  /***/
  messages: {
    en: EN,
    ar: AR,
  },
})

const app = createApp(App)

app.use(createPinia())
app.mixin(numberFormat)
app.use(i18n)
app.use(VueViewer)
app.use(autoAnimatePlugin)
app.use(router)

app.mount('#app')
