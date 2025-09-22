import clientsRoutes from './administration/clients'
import payersRoutes from './administration/payers'
import usersRoutes from './administration/users'

const administraitonRoutes = [
  {
    path: 'users-management',
    name: 'administration-usersManagement-view',
    meta: {
      hasSubLinks: false,
      module: ['humanResources', 'usersManagement'],
    },
    component: () => import('@/views/administration/usersManagementView.vue'),

    redirect: { name: 'administration-users-list-view' },
    children: usersRoutes,
  },
  {
    path: 'clients-management',
    name: 'administration-clientsManagement-view',
    meta: {
      hasSubLinks: false,
      module: ['human_resources', 'clients Management'],
    },
    component: () => import('@/views/administration/clientsManagementView.vue'),
    redirect: { name: 'administration-clients-list-view' },
    children: clientsRoutes,
  },

  {
    path: 'users-config',
    name: 'administration-usersConfig-view',
    meta: {
      hasSubLinks: true,
      module: ['human_resources', 'users Config'],
    },
    component: () => import('@/views/administration/configView.vue'),
    redirect: { name: 'administration-config-specialities-view' },
    children: [
      {
        path: 'specialities',
        name: 'administration-config-specialities-view',
        module: ['human_resources', 'users Config', 'specialities'],
        component: () => import('@/views/administration/config/specialitiesView.vue'),
      },
      {
        path: 'departements',
        name: 'administration-config-departements-view',
        module: ['human_resources', 'users Config', 'departements'],
        component: () => import('@/views/administration/config/departementsView.vue'),
      },
      {
        path: 'roles',
        name: 'administration-config-roles-view',
        module: ['human_resources', 'users Config', 'roles'],
        component: () => import('@/views/administration/config/rolesView.vue'),
      },
    ],
  },

  {
    path: 'finance-config',
    name: 'administration-financeConfig-view',
    meta: {
      hasSubLinks: true,
      module: ['human_resources', 'finance Config'],
    },
    component: () => import('@/views/administration/financeConfigView.vue'),
    redirect: { name: 'administration-config-banks-view' },
    children: [
      {
        path: 'banks',
        name: 'administration-config-banks-view',
        module: ['human_resources', 'finance Config', 'banks'],
        component: () => import('@/views/administration/financeConfig/banksView.vue'),
      },
      {
        path: 'payers',
        name: 'administration-config-payers-view',
        module: ['human_resources', 'finance Config', 'payers'],
        component: () => import('@/views/administration/financeConfig/payersView.vue'),
        redirect: { name: 'administration-config-payers-list-view' },
        children: payersRoutes,
      },
    ],
  },
]

export default administraitonRoutes
