<script setup>
import { reactive } from 'vue'
import { pageSysRole } from '@/api/sys-api.js'
import ComponentPage from '@/components/component-page.vue'
import ComponentQueryFrom from '@/components/component-query-from.vue'
import ComponentQueryTable from '@/components/component-query-table.vue'

const queryConditions = reactive({
  pageNo: 1,
  pageSize: 10,
  status: null,
  name: '',
})

// 搜索功能
const handleSearch = async (pageNo, pageSize) => {
  queryConditions.pageNo = pageNo || 1
  queryConditions.pageSize = pageSize || 10
  await pageSysRole(queryConditions).then((data) => {
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
  queryConditions.status = null
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
    label: '角色名称',
    placeholder: '请输入角色名称',
    width: '120px',
    clearable: true,
  },
  {
    type: 'select',
    model: 'status',
    label: '状态',
    clearable: true,
    width: '100px',
    placeholder: '请选择状态',
    options: [
      { label: '启用', value: true },
      { label: '禁用', value: false },
    ],
  },
]

// 表格列元数据
const columns = [
  { prop: 'name', label: '角色名称', width: '180', showOverflowTooltip: true },
  { prop: 'status', label: '状态', width: '80' },
  { prop: 'remark', label: '备注', width: 'auto', showOverflowTooltip: true },
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
