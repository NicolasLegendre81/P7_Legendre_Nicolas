import { createRouter, createWebHashHistory } from 'vue-router'
/* eslint-disable */
import HomePage from "../views/HomePage.vue"

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
