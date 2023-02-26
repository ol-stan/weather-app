import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',

    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/favorites',
    name: 'favorites',

    component: () => import('../views/FavoritesView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
