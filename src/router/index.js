import { createRouter, createWebHashHistory } from 'vue-router'
/* eslint-disable */
import HomePage from "../views/HomePage.vue"
import WallPage from "../views/WallPage.vue"

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path:'/post',
    name:'WallPage',
    component:WallPage,
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
