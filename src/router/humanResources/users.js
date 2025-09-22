import usersConfigRoutes from './usersConfig'

const usersRoutes = [
  {
    path: 'list',
    name: 'humanResources-users-list-view',
    meta: {
      hasSubLinks: false,
      module: ['humanResources', 'usersManagement', 'list'],
    },
    component: () => import('@/views/humanResources/users/listView.vue'),
  },
  {
    path: 'config',
    name: 'humanResources-users-config-view',
    meta: {
      hasSubLinks: true,
      module: ['humanResources', 'usersManagement', 'config'],
    },
    component: () => import('@/views/humanResources/users/configView.vue'),
    children: usersConfigRoutes,
    redirect: { name: 'humanResources-users-config-jobPosition-view' },
  },
  {
    path: 'departements',
    name: 'humanResources-departements-view',
    meta: {
      hasSubLinks: false,
      module: ['humanResources', 'usersManagement', 'departements'],
    },
    component: () => import('@/views/humanResources/users/departementsView.vue'),
  },
  {
    path: 'add-user',
    name: 'humanResources-add-user-view',
    meta: {
      hasSubLinks: false,
      module: ['humanResources', 'usersManagement', 'add'],
    },
    component: () => import('@/views/humanResources/users/addEditUserView.vue'),
  },
  {
    path: 'edit-user/:id',
    name: 'humanResources-edit-user-view',
    meta: {
      hasSubLinks: false,
      module: ['humanResources', 'usersManagement', 'edit'],
    },
    component: () => import('@/views/humanResources/users/addEditUserView.vue'),
  },
]

export default usersRoutes
