const timeOffRoutes = [
  {
    path: 'overview',
    name: 'humanResources-timeOff-overview-view',
    meta: {
      hasSubLinks: false,
      module: ['humanResources', 'time_off', 'overview'],
    },
    component: () => import('@/views/humanResources/timeOff/overviewView.vue'),
  },
]

export default timeOffRoutes
