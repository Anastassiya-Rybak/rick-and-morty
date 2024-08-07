import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/:id',
      component: () => import('../views/CharacterView.vue')
    },
    {
      path: '/Episodes',
      name: 'Episodes',
      component: () => import('../views/Episodes/EpisodesView.vue')
    },
    {
      path: '/Episodes/:id',
      component: () => import('@/views/Episodes/TheEpisode.vue')
    },
    {
      path: '/Locations',
      name: 'Locations',
      component: () => import('../views/Locations/LocationsView.vue')
    },
    {
      path: '/Locations/:id',
      component: () => import('@/views/Locations/TheLocation.vue')
    }
  ]
})

export default router
