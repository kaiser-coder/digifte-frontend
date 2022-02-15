import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('pages/Error404.vue'),
  // },

  {
    path: '/',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SigninForm.vue') },
      { path: 'signup', component: () => import('pages/SignupForm.vue') },
    ]
  },

  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'home', component: () => import('pages/Home.vue') },
      { 
        path: 'courses', 
        component: () => import('layouts/EmptyLayout.vue'),
        children: [
          { path: 'list', component: () => import('pages/Shared/CoursesList.vue') },
          { path: 'details/:courseId', component: () => import('pages/Shared/CourseDetails.vue') },
        ]
      },
      {
        path: 'students',
        component: () => import('layouts/EmptyLayout.vue'),
        children: [
          { path: 'follow', component: () => import('pages/Admnistrator/FollowStudent.vue') },
          { path: 'register', component: () => import('pages/Admnistrator/RegistrationManagement.vue') },
          { path: 'agenda', component: () => import('pages/Student/StudentAgenda.vue') }
        ]
      }
    ]
  }
];

export default routes;
