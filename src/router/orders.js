const ordersRoutes = [
  {
    path: 'list',
    name: 'orders-list-view',
    meta: {
      hasSubLinks: false,
      module: ['orders', 'list'],
    },
    component: () => import('@/views/orders/listView.vue'),
  },
  {
    path: 'add',
    name: 'add-order-view',
    meta: {
      hasSubLinks: false,
      module: ['orders', 'add order'],
    },
    component: () => import('@/views/orders/addEditOrderView.vue'),
  },
]

export default ordersRoutes
