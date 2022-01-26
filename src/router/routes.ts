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
      { path: 'signin', component: () => import('pages/SigninForm.vue') },
      { path: 'signup', component: () => import('pages/SignupForm.vue') },
    ]
  },
  {
    path: '/dashboard',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: 'home', component: () => import('pages/Home.vue') },
    ]
  },
];

export default routes;
