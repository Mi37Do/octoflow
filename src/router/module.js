import humanResourceRoutes from './humanResources'
import salesRoutes from './sales'

const modulesRoutes = [
  {
    path: 'human-resources',
    name: 'humanResources-view',
    component: () => import('@/views/modules/humanResourcesModule.vue'),
    children: humanResourceRoutes,
    redirect: { name: humanResourceRoutes[0].name },
  },
  {
    path: 'sales',
    name: 'sales-view',
    component: () => import('@/views/modules/salesModule.vue'),
    children: salesRoutes,
    redirect: { name: salesRoutes[0].name },
  } /**
  {
    path: 'discussions',
    name: 'discussions-view',
    component: () => import('@/views/pages/discussionsView.vue'),
  }, */,
]

export default modulesRoutes
