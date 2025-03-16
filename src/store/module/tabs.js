import { defineStore } from 'pinia'

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [],
    activeTab: ''
  }),
  actions: {
    addTab(tab) {
      if (!this.tabs.some((t) => t.path === tab.path)) {
        this.tabs.push(tab)
      }
      this.activeTab = tab.path
    },
    removeTab(path) {
      this.tabs = this.tabs.filter(tab => tab.path !== path)
      if (this.activeTab === path && this.tabs.length > 0) {
        this.activeTab = this.tabs[this.tabs.length - 1].path
      } else if (this.tabs.length === 0) {
        this.activeTab = ''
      }
    }
  }
})

