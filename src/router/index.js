import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import administraitonRoutes from './administration'

import modulesRoutes from './module'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/app',
      name: 'app',
      meta: { requireAuth: true },
      component: () => import('../views/mainPanel.vue'),
      children: modulesRoutes,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/pages/loginView.vue'),
    },
    {
      path: '/',
      name: 'overview',
      meta: { requireAuth: true },
      component: () => import('../views/overviewModule.vue'),
    },
    //coming-soon-view
    {
      path: '/coming-soon',
      name: 'coming-soon-view',
      component: () => import('../views/comingSoonView.vue'),
    },
  ],
})

/**
router.beforeEach(async (to, from, next) => {
  const useAuth = useAuthStore()
  try {
    await useAuth.getInfos()
    if (to.meta.requireAuth && !useAuth.authUser.isAuth) {
      next({ name: 'login' })
    } else {
      next()
    }
  } catch (error) {
    console.error('Navigation error:', error)
    next(false)
  }
})
*/
export default router
