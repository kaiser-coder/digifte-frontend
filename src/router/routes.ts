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

  {
    path: '/home-professor',
    component: () => import('src/components/Professor/HomePageProfessor.vue'),
    children: [
      { path: 'create-course', component: () => import('src/components/Professor/Contents/CreationCourse.vue')},
      { path: 'create-lesson', component: () => import('src/components/Professor/Contents/CreationLesson.vue')},
      { path: 'create-meeting', component: () => import('src/components/Professor/Contents/CreationMeeting.vue')},
    ]
  },

  {
    path: '/home-admnistrator',
    component: () => import('src/components/Admnistrator/HomePageAdmnistrator.vue'),
    children: [
      { path: 'student-follow', component: () => import('src/components/Admnistrator/Contents/FollowStudent.vue')},
      { path: 'registration-management', component: () => import('src/components/Admnistrator/Contents/RegistrationManagement.vue')},
    ]
  },

  {
    path: '/home-student',
    component: () => import('src/components/Student/HomePageStudent.vue'),
    children: [
      { path: 'student-subscribe', component: () => import('src/components/Student/Contents/StudentCourseMeeting.vue')},
      { path: 'student-agenda', component: () => import('src/components/Student/Contents/StudentAgenda.vue')},
    ]
  },
];

export default routes;
