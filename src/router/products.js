const productsRoutes = [
  {
    path: 'list',
    name: 'products-list-view',
    meta: {
      hasSubLinks: false,
      module: ['products', 'list'],
    },
    component: () => import('@/views/products/listView.vue'),
  },
  {
    path: 'config',
    name: 'products-config-view',
    meta: {
      hasSubLinks: true,
      module: ['products', 'config'],
    },
    component: () => import('@/views/products/configView.vue'),
    redirect: { name: 'products-config-colors-view' },
    children: [
      {
        path: 'colors',
        name: 'products-config-colors-view',
        module: ['products', 'config', 'colors'],
        component: () => import('@/views/products/config/colorsView.vue'),
      },
      {
        path: 'types',
        name: 'products-config-types-view',
        module: ['products', 'config', 'types'],
        component: () => import('@/views/products/config/typesView.vue'),
      },
      {
        path: 'conditioning',
        name: 'products-config-conditioning-view',
        module: ['products', 'config', 'conditioning'],
        component: () => import('@/views/products/config/conditioningView.vue'),
      },
    ],
  },
]

export default productsRoutes
