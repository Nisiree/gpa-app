
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('@/pages/MainComponent.vue') },
      { path: 'second', component: () => import('@/pages/SecondPage.vue') },

      { path: 'button', component: () => import('@/pages/ch4/Ex_qtn.vue') },
      { path: 'qlist', component: () => import('@/pages/ch4/Ex_qlist.vue') },
      { path: 'qtable', component: () => import('@/pages/ch4/Ex_qtable.vue') },
      { path: 'testapi', component: () => import('@/pages/ch6/Ex_api.vue') },
      { path: 'post', component: () => import('@/pages/ch6/Ex_api.vue') },
      { path: 'crud', component: () => import('@/pages/ch6/Ex_crud.vue') },
      { path: 'mockapi', component: () => import('@/pages/ch6/SubjectPage.vue') },
      { path: 'env', component: () => import('@/pages/ch8/EX_env.vue') },
      { path: 'subject', component: () => import('@/pages/ch8/sucjectPage.vue') },

      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/ch7/LoginPage.vue'),
      },
      {
        path: 'profile',
        name: 'profile',
        meta: { requiresAuth: true },
        component: () => import('@/pages/ch7/ProfilePage.vue'),
      },
      {
        path: 'teacher',
        name: 'teacher',
        component: () => import('@/pages/ch7/TeacherPage.vue'),
        meta: { requiresAuth: true, roles: ['teacher', 'admin'] },
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/pages/ch7/AdminPage.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
]

export default routes