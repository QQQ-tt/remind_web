import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from '@/store/index'
import ElMsg from '@/util/el-msg'
import { testToken } from '@/api/login-api.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'login' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/view/manage-login.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/view/container/container-layout.vue'),
      redirect: {name: 'dashboardLog'},
      children: [
        {
          path: 'log',
          name: 'dashboardLog',
          component: () => import('@/view/dashboard/dashboard-log.vue'),
        },
      ],
    },
    {
      path: '/sys',
      name: 'sysManagement',
      component: () => import('@/view/container/container-layout.vue'),
      redirect: {name: 'sysManagementUser'},
      children: [
        {
          path: 'user',
          name: 'sysManagementUser',
          component: () => import('@/view/sys/sys-user.vue'),
        },
        {
          path: 'role',
          name: 'sysManagementRole',
          component: () => import('@/view/sys/sys-role.vue'),
        },
        {
          path: 'resource',
          name: 'sysManagementResource',
          component: () => import('@/view/sys/sys-resource.vue'),
        },
      ],
    },
    {
      path: '/frequency',
      name: 'rule',
      component: () => import('@/view/container/container-layout.vue'),
      redirect: {name: 'frequencyManagementRule'},
      children: [
        {
          path: 'rule',
          name: 'frequencyManagementRule',
          component: () => import('@/view/frequency/frequency-rule.vue'),
        },
        {
          path: 'task',
          name: 'frequencyManagementTask',
          component: () => import('@/view/frequency/frequency-task.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const userToken = useTokenStore()
  if (to.name === 'login' || to.path === '/') {
    if (userToken.info.token) {
      try {
        const res = await testToken()
        if (res.data.code === 200 && res.data.data) {
          next({ name: 'dashboard' })
        } else {
          userToken.removeToken()
          next()
        }
      } catch (error) {
        userToken.removeToken()
        next({ name: 'login', query: { redirect: to.fullPath } })
        console.error(error)
      }
    } else {
      next()
    }
  } else if (userToken.info.token) {
    next()
  } else {
    next({ name: 'login', query: { redirect: to.fullPath } })
    ElMsg.warningMsg('请先登录')
  }
})

export default router
