const contactsRoutes = [
  {
    path: 'list',
    name: 'sales-contacts-list-view',
    meta: {
      hasSubLinks: false,
      module: ['sales', 'contacts', 'list'],
    },
    component: () => import('@/views/sales/contacts/listView.vue'),
  },
  {
    path: 'add-client/:type',
    name: 'sales-add-client-view',
    meta: {
      hasSubLinks: false,
      module: ['sales', 'contacts', 'add'],
    },
    component: () => import('@/views/sales/contacts/addEditClientView.vue'),
  },
  {
    path: 'edit-client/:id',
    name: 'sales-edit-client-view',
    meta: {
      hasSubLinks: false,
      module: ['sales', 'contacts', 'edit'],
    },
    component: () => import('@/views/sales/contacts/addEditClientView.vue'),
  },
]

export default contactsRoutes
