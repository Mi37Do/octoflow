const usersConfigRoutes = [
  {
    path: 'job-position',
    name: 'humanResources-users-config-jobPosition-view',
    component: () => import('@/views/humanResources/users/config/jobPositionsView.vue'),
  },
  {
    path: 'work-locations',
    name: 'humanResources-users-config-workLocations-view',
    component: () => import('@/views/humanResources/users/config/workLocationsView.vue'),
  },
]

export default usersConfigRoutes
