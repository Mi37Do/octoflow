const recruitmentRoutes = [
  {
    path: 'list',
    name: 'humanResources-recruitment-list-view',
    meta: {
      hasSubLinks: false,
      module: ['humanResources', 'recruitment', 'list'],
    },
    component: () => import('@/views/humanResources/recruitment/listView.vue'),
  },
  {
    path: 'config',
    name: 'humanResources-recruitment-config-view',
    meta: {
      hasSubLinks: false,
      module: ['humanResources', 'recruitment', 'config'],
    },
    component: () => import('@/views/humanResources/recruitment/configView.vue'),
  },
]

export default recruitmentRoutes
