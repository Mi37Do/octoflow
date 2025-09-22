const usersRoutes = [
  {
    path: 'list',
    name: 'administration-users-list-view',
    meta: {
      hasSubLinks: false,
      module: ['administration', 'users Management', 'list'],
    },
    component: () => import('@/views/administration/users/listView.vue'),
  },
  {
    path: 'add-user',
    name: 'administration-add-user-view',
    meta: {
      hasSubLinks: false,
      module: ['administration', 'users Management', 'add'],
    },
    component: () => import('@/views/administration/users/addEditUserView.vue'),
  },
  {
    path: 'edit-user/:id',
    name: 'administration-edit-user-view',
    meta: {
      hasSubLinks: false,
      module: ['administration', 'users Management', 'edit'],
    },
    component: () => import('@/views/administration/users/addEditUserView.vue'),
  },
]

export default usersRoutes
