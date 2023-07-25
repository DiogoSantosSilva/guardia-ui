import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/'
})

loadFonts()

const app = createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .provide('$http', axiosInstance)

app.mixin({
  beforeCreate () {
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  }
})
app.mount('#app')
