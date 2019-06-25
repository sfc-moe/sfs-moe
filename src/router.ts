import Vue from 'vue';
import Router from 'vue-router';

import Assignments from './views/Assignments.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/assignments',
      name: 'Assignments',
      component: Assignments,
    }
  ],
});
