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
      component: () => import('@/view/mange-login.vue'),
    },
    {
      path: '/sys',
      name: 'sys',
      component: () => import('@/view/container/container-layout.vue'),
      redirect: '/sys/user',
      children: [
        {
          path: '/sys/user',
          name: 'user',
          component: () => import('@/view/sys/sys-user.vue'),
        },
        {
          path: '/sys/role',
          name: 'role',
          component: () => import('@/view/sys/sys-role.vue'),
        },
        {
          path: '/sys/resource',
          name: 'menu',
          component: () => import('@/view/sys/sys-resource.vue'),
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
          next({ name: 'sys' })
        } else {
          userToken.removeToken()
          next()
        }
      } catch (error) {
        ElMsg.warningMsg('登录状态异常，请重新登录')
        userToken.removeToken()
        next({ name: 'login' })
        console.log(error)
      }
    } else {
      next()
    }
  } else if (userToken.info.token) {
    next()
  } else {
    next({ name: 'login' })
    ElMsg.warningMsg('请先登录')
  }
})

export default router
