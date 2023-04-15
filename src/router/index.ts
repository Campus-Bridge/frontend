import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})
let isLogin = false
const isUserLoggedIn = async () => {
  if (isLogin) {
    return true
  }
  const token = localStorage.getItem('token')
  const response = await axios.get('http://localhost:3000/api/user/checkToken', {
    headers: {
      Authorization: token
    }
  })

  if (response.data.message !== undefined) {
    return false
  }

  isLogin = true
  return true
}

router.beforeEach(async (to, from, next) => {
  if (await isUserLoggedIn()) {
    if (to.name === 'home') {
      next({ name: 'dashboard' })
    }
    next()
  } else {
    if (to.name !== 'home') {
      next({ name: 'home' })
    }
    next()
  }
})

export default router
