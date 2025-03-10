import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useTokenStore = defineStore(
  'token',
  () => {
    const info = reactive({
      token: '',
      id: '',
      name: '',
    })
    const setToken = (token, id, name) => {
      info.token = token
      info.id = id
      info.name = name
    }
    const removeToken = () => {
      info.token = ''
      info.id = ''
      info.name = ''
    }
    return {
      info,
      setToken,
      removeToken,
    }
  },
  { persist: true }
)
