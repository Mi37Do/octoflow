import projectsRoutes from './humanResources/projects'
import recruitmentRoutes from './humanResources/recruitment'
import timeOffRoutes from './humanResources/timeOff'
import usersRoutes from './humanResources/users'

const humanResourceRoutes = [
  {
    path: 'users-management',
    name: 'humanResources-usersManagement-view',
    meta: {
      hasSubLinks: false,
      module: ['humanResources', 'usersManagement'],
    },
    component: () => import('@/views/humanResources/usersManagementView.vue'),
    children: usersRoutes,
    redirect: { name: 'humanResources-users-list-view' },
  },
  {
    path: 'recrutements',
    name: 'humanResources-recrutements-view',
    meta: {
      hasSubLinks: false,
      module: ['humanResources', 'recrutements'],
    },
    component: () => import('@/views/humanResources/recrutementsView.vue'),
    children: recruitmentRoutes,
    redirect: { name: 'humanResources-recruitment-list-view' },
  },
  {
    path: 'attendances',
    name: 'humanResources-attendances-view',
    meta: {
      hasSubLinks: false,
      module: ['humanResources', 'attendances'],
    },
    component: () => import('@/views/humanResources/attendancesView.vue'),
  },
  {
    path: 'time-off',
    name: 'humanResources-timeOff-view',
    meta: {
      hasSubLinks: false,
      module: ['humanResources', 'timeOff'],
    },
    component: () => import('@/views/humanResources/timeOffView.vue'),
    children: timeOffRoutes,
    redirect: { name: 'humanResources-timeOff-overview-view' },
  },
  {
    path: 'projects-management',
    name: 'humanResources-projectsManagement-view',
    meta: {
      hasSubLinks: false,
      module: ['humanResources', 'projects_management'],
    },
    component: () => import('@/views/humanResources/projectsManagementView.vue'),
    children: projectsRoutes,
    redirect: { name: 'humanResources-projectsManagement-list-view' },
  },
  {
    path: '/discussions',
    name: 'humanResources-discussions-view',
    meta: {
      hasSubLinks: false,
      module: ['discussions'],
    },
    component: () => import('@/views/pages/discussionsView.vue'),
    children: [
      {
        path: 'chat',
        name: 'humanResources-chat-view',
        meta: {
          hasSubLinks: false,
          module: ['discussions', 'chat'],
        },
        component: () => import('@/views/discussions/chatView.vue'),
      },
    ],
  },
]

export default humanResourceRoutes
