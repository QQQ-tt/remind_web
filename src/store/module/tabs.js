import { defineStore } from 'pinia'

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [],
    activeTab: '',
  }),
  actions: {
    initTab(route) {
      if (this.tabs) {
        // 确保 activeTab 设置为当前路由的路径
        if (this.tabs.some((tab) => tab.path === route.fullPath)) {
          this.activeTab = route.fullPath;
        } else if (this.tabs.length > 0) {
          this.activeTab = this.tabs[0].path;
        } else {
          this.activeTab = '';
        }
      } else {
        // 初始化默认标签页
        const dashboardLogRoute = route.getRoutes().find(route => route.name === 'dashboardLog')
        if (dashboardLogRoute) {
          this.addTab({
            name: dashboardLogRoute.name,
            path: dashboardLogRoute.path,
            title: dashboardLogRoute.meta.title || '未命名',
            icon: dashboardLogRoute.meta.icon || 'Document'
          })
        }
      }
    },
    addTab(tab) {
      if (!this.tabs.some((t) => t.path === tab.path)) {
        this.tabs.push(tab)
      }
      this.activeTab = tab.path
    },
    removeTab(path) {
      this.tabs = this.tabs.filter((tab) => tab.path !== path)
      if (this.activeTab === path && this.tabs.length > 0) {
        this.activeTab = this.tabs[this.tabs.length - 1].path
      } else if (this.tabs.length === 0) {
        this.activeTab = ''
      }
    },
  }, persist: true
})
