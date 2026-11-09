import { defineRouter } from '#q-app'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { Notify } from 'quasar'
import { useAuthStore } from '@/stores/authStore'

import routes from './routes.js'

export default defineRouter(() => {
  const createHistory = import.meta.env.QUASAR_SERVER
    ? createMemoryHistory
    : import.meta.env.QUASAR_VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(import.meta.env.QUASAR_VUE_ROUTER_BASE),
  })

  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    // 1) ต้อง login ก่อน
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      Notify.create({
        type: 'warning',
        message: 'Please login first.',
      })
      return next({ name: 'login' })
    }

    // 2) ตรวจสิทธิ์ตาม role
    if (to.meta.roles && !to.meta.roles.includes(authStore.role)) {
      Notify.create({
        type: 'negative',
        message: 'You do not have permission to access this page.',
      })

      switch (authStore.role) {
        case 'admin':
          return next({ name: 'admin' })
        case 'teacher':
          return next({ name: 'teacher' })
        default:
          return next({ name: 'profile' })
      }
    }

    next()
  })

  return Router
})