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
  /* 占据整个宽度 */
  width: 100%;
  /* 文字居中 */
  text-align: center;
  /* 上下内边距 */
  padding: 8px 0;
  /* 浅灰色文字 */
  color: #6b7280;
  /* 默认字体大小 */
  font-size: 8px;
  /* 平滑颜色过渡 */
  transition: color 0.3s ease;
}

@media (min-width: 768px) {
  .footer {
    font-size: 16px;
    /* 响应式字体调整 */
  }
}

.footer:hover {
  color: #1e293b;
  /* 鼠标悬停时文字变深 */
}
</style>
