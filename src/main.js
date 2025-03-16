import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import pinia from '@/store/index.js'

const app = createApp(App)

app.use(pinia)

app.use(router)

// 全局键盘事件监听器 Ctrl + S 被阻止
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault()
  }
})

app.mount('#app')
