<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="footer">
    信息管理 ©{{ currentYear }} Created by QQQtx
  </div>
</template>

<style scoped>
.footer {
  width: 100%; /* 占据整个宽度 */
  text-align: center; /* 文字居中 */
  padding: 12px 0; /* 上下内边距 */
  color: #6b7280; /* 浅灰色文字 */
  font-size: 14px; /* 默认字体大小 */
  transition: color 0.3s ease; /* 平滑颜色过渡 */
}

@media (min-width: 768px) {
  .footer {
    font-size: 16px; /* 响应式字体调整 */
  }
}

.footer:hover {
  color: #1e293b; /* 鼠标悬停时文字变深 */
}
</style>
