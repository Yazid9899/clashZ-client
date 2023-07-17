import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import LoginView from "../views/LoginView.vue"
import RegisterView from "../views/RegisterView.vue"
import MyAccountView from "../views/MyAccountView.vue"
import { useMainStore } from '../stores'
import TrainTroopView from "../views/TrainTroopView.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/myAccounts',
      name: 'accounts',
      component: MyAccountView
    },
    {
      path: '/trainsTroops',
      name: 'TrainTroopView',
      component: TrainTroopView
    },
  ]
})
router.beforeEach(async (to,from)=>{
  const store = useMainStore()
  if(store.login && (to.name === 'login' || to.name === 'register')) {
    return {name:'home'}
  }
  if (!store.login && to.name === 'home'){
    return {name:'login'}
  }
  if (!store.login && to.name === 'accounts'){
    return {name:'login'}
  }
  if (!store.login && to.name === 'TrainTroopView'){
    return {name:'login'}
  }
  })
export default router
