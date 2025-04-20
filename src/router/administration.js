import payersRoutes from './administration/payers/payers'

const administraitonRoutes = [
  {
    path: 'users-config',
    name: 'administration-usersConfig-view',
    meta: {
      hasSubLinks: true,
      module: ['administration', 'users Config'],
    },
    component: () => import('@/views/administration/configView.vue'),
    redirect: { name: 'administration-config-specialities-view' },
    children: [
      {
        path: 'specialities',
        name: 'administration-config-specialities-view',
        module: ['administration', 'users Config', 'specialities'],
        component: () => import('@/views/administration/config/specialitiesView.vue'),
      },
      {
        path: 'departements',
        name: 'administration-config-departements-view',
        module: ['administration', 'users Config', 'departements'],
        component: () => import('@/views/administration/config/departementsView.vue'),
      },
      {
        path: 'roles',
        name: 'administration-config-roles-view',
        module: ['administration', 'users Config', 'roles'],
        component: () => import('@/views/administration/config/rolesView.vue'),
      },
    ],
  },

  {
    path: 'finance-config',
    name: 'administration-financeConfig-view',
    meta: {
      hasSubLinks: true,
      module: ['administration', 'finance Config'],
    },
    component: () => import('@/views/administration/financeConfigView.vue'),
    redirect: { name: 'administration-config-banks-view' },
    children: [
      {
        path: 'banks',
        name: 'administration-config-banks-view',
        module: ['administration', 'finance Config', 'banks'],
        component: () => import('@/views/administration/financeConfig/banksView.vue'),
      },
      {
        path: 'payers',
        name: 'administration-config-payers-view',
        module: ['administration', 'finance Config', 'payers'],
        component: () => import('@/views/administration/financeConfig/payersView.vue'),
        redirect: { name: 'administration-config-payers-list-view' },
        children: payersRoutes,
      },
    ],
  },
]

export default administraitonRoutes
