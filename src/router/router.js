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
      redirect: { name: 'dashboardLog' },
      children: [
        {
          path: 'log',
          name: 'dashboardLog',
          meta: {
            title: '仪表盘',
            icon: 'Monitor',
          },
          component: () => import('@/view/dashboard/dashboard-log.vue'),
        },
      ],
    },
    {
      path: '/frequency',
      name: 'frequencyManagement',
      meta: {
        title: '频率管理',
        icon: 'Timer'
      },
      component: () => import('@/view/container/container-layout.vue'),
      redirect: { name: 'frequencyManagementRule' },
      children: [
        {
          path: 'rule',
          name: 'frequencyManagementRule',
          meta: {
            title: '规则管理',
            icon: 'Memo'
          },
          component: () => import('@/view/frequency/frequency-rule.vue'),
        },
        {
          path: 'task',
          meta: {
            title: '任务管理',
            icon: 'List'
          },
          name: 'frequencyManagementTask',
          component: () => import('@/view/frequency/frequency-task.vue'),
        },
      ],
    },
    {
      path: '/sys',
      name: 'sysManagement',
      meta: {
        title: '系统管理',
        icon: 'Setting'
      },
      component: () => import('@/view/container/container-layout.vue'),
      redirect: { name: 'sysManagementUser' },
      children: [
        {
          path: 'user',
          name: 'sysManagementUser',
          meta: {
            title: '用户管理',
            icon: 'User'
          },
          component: () => import('@/view/sys/sys-user.vue'),
        },
        {
          path: 'role',
          name: 'sysManagementRole',
          meta: {
            title: '角色管理',
            icon: 'Avatar'
          },
          component: () => import('@/view/sys/sys-role.vue'),
        },
        {
          path: 'resource',
          name: 'sysManagementResource',
          meta: {
            title: '资源管理',
            icon: 'Grid'
          },
          component: () => import('@/view/sys/sys-resource.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const userToken = useTokenStore()
  userToken.restoreToken()
  if (to.name === 'login' || to.path === '/') {
    if (userToken.token) {
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
        next()
        console.error(error)
      }
    } else {
      next()
    }
  } else if (userToken.token) {
    next()
  } else {
    next({ name: 'login', query: { redirect: to.fullPath } })
    ElMsg.warningMsg('请先登录')
  }
})

export default router
