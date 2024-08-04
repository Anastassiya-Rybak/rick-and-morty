import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Episodes',
      name: 'Episodes',
      component: () => import('../views/Episodes/index.vue')
    },
    {
      path: '/Episodes/:id',
      component: () => import('@/views/Episodes/Episode.vue')
    },
    {
      path: '/Locations',
      name: 'Locations',
      component: () => import('../views/Locations/index.vue')
    },
    {
      path: '/Locations/:id',
      component: () => import('@/views/Locations/Location.vue')
    }
  ]
})

export default router
