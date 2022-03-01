import { createApp } from 'vue'
import App from './App.vue'
import axios  from 'axios'
import router from './router'
Vue.prototype.$http = axios

createApp(App).use(router).mount('#app')