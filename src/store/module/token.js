import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', {
  state: () => ({
    token: '',
    id: '',
    name: '',
  }),

  actions: {
    setToken(token, id, name, remember) {
      this.token = token
      this.id = id
      this.name = name

      const data = JSON.stringify({ token, id, name })
      if (remember) {
        localStorage.setItem('tokenStore', data) // 记住我 → localStorage
      } else {
        sessionStorage.setItem('sessionToken', data) // 不记住 → sessionStorage
      }
    },

    removeToken() {
      this.token = ''
      this.id = ''
      this.name = ''
      localStorage.removeItem('tokenStore')
      sessionStorage.removeItem('sessionToken') // 清除 session 记录
      sessionStorage.removeItem('sessionFlag') // 关闭页面时标记也要清除
    },

    restoreToken() {
      // 先尝试从 sessionStorage 恢复
      const sessionData = sessionStorage.getItem('sessionToken')
      if (sessionData) {
        Object.assign(this, JSON.parse(sessionData))
        return
      }

      // 如果 session 没有，尝试从 localStorage 恢复
      const localData = localStorage.getItem('tokenStore')
      if (localData) {
        Object.assign(this, JSON.parse(localData))
      }
    },
  },
})
