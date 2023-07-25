import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import DependentsView from '../views/DependentsView.vue'
import RecordsView from '../views/RecordsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
    redirect: { name: 'dependents' },
    children: [
      {
        path: 'dependents',
        name: 'dependents',
        component: DependentsView
      },
      {
        path: 'records',
        name: 'records',
        component: RecordsView
      }
    ]
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login')
  }
  next()
})
export default router
