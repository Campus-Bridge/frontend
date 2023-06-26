import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Quasar, Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/api/'

import App from './App.vue'
import router from './router'

import './css/main.css'
import i18n from './modules/i18n'

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Notify
  },
  config: {
    notify: {}
  }
})
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
