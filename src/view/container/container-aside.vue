<script lang="ts" setup>
import { Document, Setting, Timer, Memo, Histogram, Lock, User, Monitor } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import router from "@/router/router"

// 获取当前路由对象
const route = useRoute()

// 计算当前激活菜单项
const activeMenu = computed(() => route.name)

// 处理菜单点击
const menuSelect = (key) => {
  router.push({ name: key })
}
</script>

<template>
  <div class="sidebar-wrapper">
    <el-menu
      :default-active="activeMenu"
      class="sidebar-menu"
      background-color="#fff"
      text-color="#333"
      active-text-color="#409EFF"
      unique-opened
      @select="menuSelect"
    >
      <h5 class="mb-2">Remind</h5>
      <!-- 仪表盘 -->
      <el-menu-item index="dashboardLog">
        <el-icon><Monitor /></el-icon>
        <span>仪表盘</span>
      </el-menu-item>

      <!-- 频率管理 -->
      <el-sub-menu index="frequencyManagement">
        <template #title>
          <el-icon><Timer /></el-icon>
          <span>频率管理</span>
        </template>
        <el-menu-item index="frequencyManagementRule">
          <el-icon><Memo /></el-icon>
          规则配置
        </el-menu-item>
        <el-menu-item index="frequencyManagementTask">
          <el-icon><Histogram /></el-icon>
          任务监控
        </el-menu-item>
      </el-sub-menu>

      <!-- 系统管理 -->
      <el-sub-menu index="sysManagement">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="sysManagementUser">
          <el-icon><User /></el-icon>
          用户管理
        </el-menu-item>
        <el-menu-item index="sysManagementRole">
          <el-icon><Lock /></el-icon>
          角色管理
        </el-menu-item>
        <el-menu-item index="sysManagementResource">
          <el-icon><Document /></el-icon>
          资源管理
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style scoped>
.mb-2,.el-menu-item, :deep(.el-sub-menu__title) {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* 侧边栏整体样式 */
.sidebar-menu {
  width: 190px;
  background: #fff;
  border-radius: 12px;
  padding: 15px 10px; /* 增加顶部内边距 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* 更强的阴影 */
  transition: width 0.3s ease; /* 宽度变化动画 */
}

/* 统一菜单项样式 */
.el-menu-item, :deep(.el-sub-menu__title) {
  border-radius: 12px;
  margin-top: 10px;
  transition: all 0.3s ease;
}

/* 菜单项悬停效果 */
.el-menu-item:hover, :deep(.el-sub-menu__title:hover) {
  background: rgba(62, 163, 200, 0.2); /* 更淡的悬停色 */
  transform: scale(1.05); /* 轻微缩放 */
}

/* 选中菜单项样式 */
.el-menu-item.is-active {
  background: linear-gradient(135deg, #409EFF, #66b1ff);
  color: #fff;
  font-weight: bold;
  padding: 12px 20px; /* 略微增加内边距 */
  transform: translateX(3px); /* 轻微位移反馈 */
}

/* 选中菜单项的图标颜色 */
.el-menu-item.is-active .el-icon {
  color: #fff;
}

/* 子菜单的标题 */
:deep(.el-sub-menu__title) {
  font-size: 14px;
  font-weight: 800;
}

/* 外部容器 */
.sidebar-wrapper {
  width: 190px; /* 适当减少宽度 */
  height: 100vh;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background: white;
  transition: all 0.3s ease;
}

/* 内部菜单样式 */
.sidebar-menu {
  width: 100%;
  height: 100%;
  border-radius: inherit; /* 继承 wrapper 的圆角 */
}
</style>
