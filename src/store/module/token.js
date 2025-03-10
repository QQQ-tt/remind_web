import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'

export const useTokenStore = defineStore(
  'token',
  () => {
    const info = reactive({
      token: '',
      id: '',
      name: '',
      isRemember: false, // 记录是否勾选“记住我”
    })

    const setToken = (token, id, name, remember) => {
      info.token = token
      info.id = id
      info.name = name
      info.isRemember = remember
    }

    const removeToken = () => {
      info.token = ''
      info.id = ''
      info.name = ''
      info.isRemember = false
      localStorage.removeItem('tokenStore')
      sessionStorage.removeItem('sessionFlag') // 关闭页面时标记也要清除
    }

    // 监听 info 的变化，自动存入 localStorage
    watch(
      info,
      (newInfo) => {
        localStorage.setItem('tokenStore', JSON.stringify(newInfo))
      },
      { deep: true }
    )

    // 页面加载时，从 localStorage 还原数据
    const savedData = localStorage.getItem('tokenStore')
    if (savedData) {
      Object.assign(info, JSON.parse(savedData))
    }

    // 用 sessionStorage 记录是否是页面刷新（sessionStorage 在关闭浏览器时会自动清除）
    if (!sessionStorage.getItem('sessionFlag')) {
      sessionStorage.setItem('sessionFlag', 'true')
    }

    // 监听 beforeunload，仅在完全关闭页面（非刷新）时清除 localStorage
    window.addEventListener('beforeunload', () => {
      if (!info.isRemember && !sessionStorage.getItem('sessionFlag')) {
        localStorage.removeItem('tokenStore')
      }
    })

    return {
      info,
      setToken,
      removeToken,
    }
  }
)

