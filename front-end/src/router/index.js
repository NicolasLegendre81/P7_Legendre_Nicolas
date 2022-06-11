import  {createWebHistory, createRouter} from 'vue-router'
import HomePage from "../views/HomePage.vue"
import WallPage from "../views/WallPage.vue"
import SignUp from "../components/SignUp.vue"
import Login from "../components/Login.vue"
import GetProfile from "../components/GetProfile.vue"

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
    name: 'SignUp',
    component: SignUp,

  },
  {
    path:'/login',
    name: 'Login',
    component: Login,
  },
  {
    path:'/profil/:id',
    name:'GetProfile',
    component:GetProfile,
  }
]

const router = createRouter({
  mode:history,
  history: createWebHistory(),
  routes,
})

export default router;
