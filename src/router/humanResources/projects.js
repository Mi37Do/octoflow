const projectsRoutes = [
  {
    path: 'list',
    name: 'humanResources-projectsManagement-list-view',
    meta: {
      hasSubLinks: false,
      module: ['humanResources', 'projects_management', 'list'],
    },
    component: () => import('@/views/humanResources/projects/listView.vue'),
  },
  {
    path: 'project',
    name: 'humanResources-projectsManagement-project-view',
    meta: {
      hasSubLinks: false,
      module: ['humanResources', 'projects_management', 'project'],
    },
    component: () => import('@/views/humanResources/projects/projectView.vue'),
  },
]

export default projectsRoutes
