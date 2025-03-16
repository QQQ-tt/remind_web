<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useTabsStore } from '@/store/index'
import { watch } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()

// 初始化 Tab
tabsStore.initTab(route)

// 监听路由变化，添加 Tab
watch(() => route.fullPath, (newPath) => {
  tabsStore.addTab({
    name: route.name,
    path: newPath,
    title: route.meta.title || '未命名',
    icon: route.meta.icon || 'Document'
  })
})

// 处理 Tab 关闭事件
const handleRemove = (targetPath) => {
  if (tabsStore.tabs[0].path === targetPath) {
    return
  }
  tabsStore.removeTab(targetPath)
  router.push(tabsStore.activeTab)
}

// 处理 Tab 点击事件
const handleClick = (tab) => {
  router.push(tab.path)
}
</script>

<template>
  <!-- Tabs 组件 -->
  <el-tabs
    v-model="tabsStore.activeTab"
    @tab-remove="handleRemove"
    class="custom-tabs"
  >
    <el-tab-pane
      v-for="(tab, index) in tabsStore.tabs"
      :key="tab.path"
      :name="tab.path"
      :closable="index !== 0"
    >
      <template #label>
        <div class="tab-label" @click="handleClick(tab)">
          <el-icon v-if="ElementPlusIconsVue[tab.icon]" class="tab-icon">
            <component :is="ElementPlusIconsVue[tab.icon]" />
          </el-icon>
          <span class="not-select">{{ tab.title }}</span>
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
  <router-view></router-view>
</template>

<style scoped>
.not-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* Tab Label 样式 */
.tab-label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 12px;
  transition: all 0.3s ease;
}
:deep(.el-tabs__item) {
  padding: 0;
}

/* 鼠标悬停时 */
.tab-label:hover {
  background: rgba(0, 123, 255, 0.1);
}

/* 选中时 */
:deep(.el-tabs__item.is-active) {
  font-weight: bold;
}

/* 图标样式 */
.tab-icon {
  font-size: 16px;
  color: #666;
}
</style>
