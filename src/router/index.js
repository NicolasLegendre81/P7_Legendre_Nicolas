import { createRouter, createWebHashHistory } from 'vue-router'
/* eslint-disable */
import HomePage from "../views/HomePage.vue"
import WallPage from "../views/WallPage.vue"
import Signup from "../components/Signup.vue"
import Login from "../components/Login.vue"

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
  },
  {
    path:'/signup',
    name: 'Signup',
    component: Signup,

  },
  {
    path:'/login',
    name: 'Login',
    component: Login,
  }



]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
