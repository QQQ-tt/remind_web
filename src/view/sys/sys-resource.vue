<script setup>
import { reactive } from 'vue'
import { pageSysResource } from '@/api/sys-api.js'
import ComponentPage from '@/components/component-page.vue'
import ComponentQueryFrom from '@/components/component-query-from.vue'
import ComponentQueryTable from '@/components/component-query-table.vue'

const queryConditions = reactive({
  pageNo: 1,
  pageSize: 10,
  name: '',
})

// 搜索功能
const handleSearch = async (pageNo, pageSize) => {
  queryConditions.pageNo = pageNo || 1
  queryConditions.pageSize = pageSize || 10
  await pageSysResource(queryConditions).then((data) => {
    tableData.value = data.data.data.records
    tableData.total = data.data.data.total
  })
}
// 初始化数据
const initData = async () => {
  await handleSearch(1, 10)
}
initData()
// 重置功能
const handleReset = () => {
  queryConditions.name = ''
}

const tableData = reactive({
  value: [],
  total: 0,
})

// 查看、编辑、删除功能的占位函数
const handleView = (index, row) => {
  console.log('查看:', index, row)
}

const handleEdit = (index, row) => {
  console.log('编辑:', index, row)
}

const handleDelete = (index, row) => {
  console.log('删除:', index, row)
}

// 表单元数据
const formItems = [
  {
    type: 'input',
    model: 'name',
    label: '资源名称',
    placeholder: '请输入资源名称',
    width: '120px',
    clearable: true,
  },
]

// 表格列元数据
const columns = [
  { prop: 'name', label: '资源名称', width: '180', showOverflowTooltip: true },
  { prop: 'url', label: '接口地址/路由地址', width: '200', showOverflowTooltip: true },
  { prop: 'icon', label: '图标', width: '100', showOverflowTooltip: true },
  { prop: 'method', label: '方法类型', width: '100', showOverflowTooltip: true },
  { prop: 'type', label: '资源类型', width: '100', showOverflowTooltip: true },
  { prop: 'status', label: '资源状态', width: '100', showOverflowTooltip: true },
  { prop: 'description', label: '详细描述', width: 'auto', minWidth: '100', showOverflowTooltip: true },
  {
    prop: 'createTime',
    label: '创建时间',
    width: '180',
    showOverflowTooltip: true,
    sortable: true,
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    width: '180',
    showOverflowTooltip: true,
    sortable: true,
  },
]

const actions = [
  { label: '查看', handler: handleView },
  { label: '编辑', handler: handleEdit },
  { label: '删除', type: 'danger', handler: handleDelete },
]

const typeSwitch = (e) => {
  switch (e) {
    case 'route':
      return '路由'
    case 'api':
      return '接口'
    default:
      return false
  }
}
const getTagType = (e) => {
  switch (e) {
    case 'route':
      return 'info'
    case 'api':
      return 'primary'
    default:
      return false
  }
}
const getTagEffect = (e) => {
  switch (e) {
    case 'route':
      return 'light'
    case 'api':
      return 'plain'
    default:
      return false
  }
}
</script>

<template>
  <div class="sidebar-wrapper">
    <component-query-from v-model="queryConditions" :form-items="formItems">
      <template #actions>
        <el-button type="primary" @click="handleSearch(queryConditions.pageNo, queryConditions.pageSize)">
          搜索
        </el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </component-query-from>
  </div>
  <div class="sidebar-wrapper right-align">
    <el-button type="primary">新增</el-button>
  </div>
  <div class="sidebar-wrapper table-pagination-container">
    <component-query-table :tableData="tableData.value" :columns="columns" :actions="actions">
      <template #type="{ row }">
        <el-tag :type="getTagType(row.type)" :effect="getTagEffect(row.type)">
          {{ typeSwitch(row.type) }}
        </el-tag>
      </template>
      <!-- 自定义状态列 -->
      <template #status="{ row }">
        <el-tag :type="row.status ? 'success' : 'danger'">
          {{ row.status ? '启用' : '禁用' }}
        </el-tag>
      </template>
    </component-query-table>
    <div class="pagination-wrap">
      <component-page :total="tableData.total" :list-page="handleSearch" />
    </div>
  </div>
</template>

<style scoped>
@import '../../style/from-table.css';
</style>
