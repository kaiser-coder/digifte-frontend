import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Home.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('pages/Error404.vue'),
  // },
  {
    path: '/',
    component: () => import('src/components/SigninForm.vue'),
  },
  {
    path: '/signup',
    component: () => import('components/SignupForm.vue'),
  }
];

export default routes;
