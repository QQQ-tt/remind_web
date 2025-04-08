import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import pinia from '@/store/index.js'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus'

const app = createApp(App)

app.use(pinia)

app.use(router)

app.use(ElementPlus, {
  locale: zhCn,
})

// 全局键盘事件监听器 Ctrl + S 被阻止
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault()
  }
})

app.mount('#app')
