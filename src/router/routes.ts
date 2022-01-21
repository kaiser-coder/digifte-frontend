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
    component: () => import('src/components/SigninForm.vue'),
  },
  {
    path: '/signup',
    component: () => import('components/SignupForm.vue'),
  },
  {
    path: '/home',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/Student/Home.vue') }],
  },
  {
    path: '/home/professor',
    component: () => import('src/layouts/MainLayoutProfessor.vue'),
    children: [{ path: '', component: () => import('pages/Professor/Home.vue') }],
  },
  
];

export default routes;
