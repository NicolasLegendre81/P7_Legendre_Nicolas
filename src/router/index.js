import { createRouter, createWebHashHistory } from 'vue-router'
/* eslint-disable */
import HomePage from "../views/HomePage.vue"
import SignUp from "../components/SignUp.vue"
import LoGin from "../components/LoGin.vue"
const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path:'/signup',
    name:'SignUp',
    component:SignUp,
  },
  {
    path:'/login',
    name:'LoGin',
    components:LoGin,
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
