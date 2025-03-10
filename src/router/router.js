import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from '@/store/index'
import ElMsg from '@/util/el-msg'

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
      component: () => import('@/view/system/sys-user.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userToken = useTokenStore()
  console.log(to)
  if (to.name === 'login' || to.path === '/') {
    next()
  } else if (userToken.info.token) {
    next()
  } else {
    router.push({ name: 'login' }).then(() => {
      ElMsg.warningMsg('请先登录')
    })
  }
})

export default router
