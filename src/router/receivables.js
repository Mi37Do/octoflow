const receivablesRoutes = [
  {
    path: 'bills',
    name: 'receivables-bills-view',
    meta: {
      hasSubLinks: false,
      module: ['receivables', 'bills'],
    },
    component: () => import('@/views/receivables/billsView.vue'),
  },
  {
    path: 'delivery-note',
    name: 'receivables-deliveryNote-view',
    meta: {
      hasSubLinks: false,
      module: ['receivables', 'delivery Note'],
    },
    component: () => import('@/views/receivables/deliveryNoteView.vue'),
  },
]

export default receivablesRoutes
