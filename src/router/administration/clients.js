const clientsRoutes = [
  {
    path: 'list',
    name: 'administration-clients-list-view',
    meta: {
      hasSubLinks: false,
      module: ['administration', 'clients Management', 'list'],
    },
    component: () => import('@/views/administration/clients/listView.vue'),
  },
  {
    path: 'add-client/:type',
    name: 'administration-add-client-view',
    meta: {
      hasSubLinks: false,
      module: ['administration', 'clients Management', 'add'],
    },
    component: () => import('@/views/administration/clients/addEditClientView.vue'),
  },
  {
    path: 'edit-client/:id',
    name: 'administration-edit-client-view',
    meta: {
      hasSubLinks: false,
      module: ['administration', 'clients Management', 'edit'],
    },
    component: () => import('@/views/administration/clients/addEditClientView.vue'),
  },
]

export default clientsRoutes
