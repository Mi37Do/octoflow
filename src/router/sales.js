import contactsRoutes from './sales/contacts'

const salesRoutes = [
  {
    path: 'contacts',
    name: 'sales-contacts-view',
    meta: {
      hasSubLinks: false,
      module: ['sales', 'contacts'],
    },
    component: () => import('@/views/sales/contactsView.vue'),
    children: contactsRoutes,
    redirect: { name: contactsRoutes[0].name },
  },
  {
    path: '/discussions',
    name: 'sales-discussions-view',
    meta: {
      hasSubLinks: false,
      module: ['discussions'],
    },
    component: () => import('@/views/pages/discussionsView.vue'),
    children: [
      {
        path: 'chat',
        name: 'sales-chat-view',
        meta: {
          hasSubLinks: false,
          module: ['discussions', 'chat'],
        },
        component: () => import('@/views/discussions/chatView.vue'),
      },
    ],
  },
]

export default salesRoutes
