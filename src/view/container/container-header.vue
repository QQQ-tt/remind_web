<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useTokenStore } from '@/store/index'
import router from '@/router/router'

const userInfo = useTokenStore()
// 模拟用户信息
const user = {
  name: userInfo.name || '张三',
  avatar: 'https://example.com/avatar.jpg',
}

const route = useRoute()
// 动态生成面包屑数组
const breadcrumbs = computed(() => {
  // 当前路径（如：/user/profile/edit）
  const pathArray = route.path.split('/').filter((part) => part)
  // 生成面包屑项
  return pathArray.reduce((acc, part) => {
    // 累计路径（如：/user, /user/profile）
    const currentPath = `/${acc.length ? acc[acc.length - 1].path.split('/').slice(1).join('/') + '/' + part : part}`
    acc.push({
      path: currentPath,
      name: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
    })
    return acc
  }, [])
})

const logout = () => {
  userInfo.removeToken()
  router.push({ name: 'login' })
}
</script>

<template>
  <el-row>
    <el-col :span="18">
      <el-breadcrumb separator="/">
        <!-- 动态生成的面包屑项 -->
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbs"
          :key="index"
          :to="item.path"
          :replace="index === breadcrumbs.length - 1"
        >
          <!-- 面包屑项内容 -->
          <span v-if="index === breadcrumbs.length - 1">{{ item.name }}</span>
          <router-link v-else :to="item.path">{{ item.name }}</router-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <!-- 右侧用户信息 -->
    <el-col :span="6" class="user-info">
      <el-dropdown trigger="click">
        <span class="user-dropdown">
          <!-- 头像 -->
          <el-avatar :size="36" :src="user.avatar" />
          <!-- 用户名 -->
          <span class="username">{{ user.name }}</span>
          <!-- 下拉箭头 -->
          <el-icon class="arrow-down">
            <ArrowDown />
          </el-icon>
        </span>
        <!-- 下拉菜单 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<style scoped>
/* 基础布局 */
.el-row {
  margin-bottom: 20px;
  align-items: center; /* 垂直居中 */
}
.el-row:last-child {
  margin-bottom: 0;
}

/* 面包屑样式 */
.el-breadcrumb {
  margin: 12px 20px 0 0;
  color: #606266;
  font-size: 14px;
}

/* 用户信息区域 */
.user-info {
  text-align: right;
}

.user-dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.3s;
}

.el-avatar {
  border-radius: 50%;
}

.username {
  margin: 0 10px;
  font-weight: bold;
  color: #303133;
}

.arrow-down {
  font-size: 16px;
  transition: transform 0.3s;
}

.user-dropdown:hover .arrow-down {
  transform: rotate(180deg);
}

/* 下拉菜单样式（穿透 scoped） */
:deep(.el-dropdown-menu) {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

:deep(.el-dropdown-menu__item) {
  padding: 10px 20px;
  font-size: 14px;
}

:deep(.el-dropdown-menu__item:hover) {
  background: #ecf5ff;
  color: #409eff;
}
</style>
