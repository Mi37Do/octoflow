const payersRoutes = [
  {
    path: 'list',
    name: 'administration-config-payers-list-view',
    module: ['administration', 'finance Config', 'payers'],
    component: () => import('@/views/administration/financeConfig/payers/payersListView.vue'),
  },
  {
    path: 'add',
    name: 'administration-config-payers-add-view',
    module: ['administration', 'finance Config', 'payers'],
    component: () => import('@/views/administration/financeConfig/payers/addEditPayerView.vue'),
  },
  {
    path: 'edit/:id',
    name: 'administration-config-payers-edit-view',
    module: ['administration', 'finance Config', 'payers'],
    component: () => import('@/views/administration/financeConfig/payers/addEditPayerView.vue'),
  },
]

export default payersRoutes
