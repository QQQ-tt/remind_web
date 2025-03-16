<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useTabsStore } from '@/store/index'
import { watch } from 'vue'
import { ElMessage } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()

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
    ElMessage.warning("首页不能关闭！")
    return
  }
  tabsStore.removeTab(targetPath)
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
    type="card"
    closable
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
          <span>{{ tab.title }}</span>
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
  <router-view></router-view>
</template>

<style scoped>
/* 让 Tabs 更加美观 */
.custom-tabs {
  padding: 5px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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

/* 鼠标悬停时 */
.tab-label:hover {
  background: rgba(0, 123, 255, 0.1);
}

:deep(.el-tabs__header,.el-tabs--card,.el-tabs__nav) {
  border: none;
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
