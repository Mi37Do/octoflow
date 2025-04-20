import { createRouter, createWebHistory } from 'vue-router'
import productsRoutes from './products'
import { useAuthStore } from '@/stores/auth'
import administraitonRoutes from './administration'
import receivablesRoutes from './receivables'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      meta: { requireAuth: true },
      component: () => import('../views/mainPanel.vue'),
      redirect: { name: 'dashboard-view' },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard-view',
          meta: {
            hasSubLinks: false,
            module: ['dashboard'],
          },
          component: () => import('../views/pages/dashboardView.vue'),
        },
        {
          path: 'administration',
          name: 'administration-view',
          meta: {
            module: ['administration'],
          },
          component: () => import('../views/pages/administrationView.vue'),
          children: administraitonRoutes,
        },
        {
          path: 'products',
          name: 'products-view',
          meta: {
            hasSubLinks: false,
          },
          component: () => import('../views/pages/productsView.vue'),
          redirect: { name: 'products-list-view' },
          children: productsRoutes,
        },
        {
          path: 'orders',
          name: 'orders-view',
          meta: {
            hasSubLinks: false,
            module: ['orders'],
          },
          component: () => import('../views/pages/ordersView.vue'),
        },
        {
          path: 'receivables',
          name: 'receivables-view',
          meta: {
            module: ['receivables'],
          },
          component: () => import('../views/pages/receivablesView.vue'),
          children: receivablesRoutes,
          redirect: { name: 'receivables-bills-view' },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/pages/loginView.vue'),
    },
  ],
})

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

export default router
