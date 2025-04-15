import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: () => import('@/views/HomeView.vue'),
      children: [
        {
          path: '',
          redirect: '/divingfish'
        },
        {
          path: 'divingfish',
          component: () => import('@/views/DivingFishView.vue')
        },
        {
          path: 'lxns',
          component: () => import('@/views/LxnsView.vue')
        }
      ]
    }
  ],
})

export default router
