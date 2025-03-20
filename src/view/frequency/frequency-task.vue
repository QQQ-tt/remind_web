<script setup>
import { reactive } from 'vue'
import { pageFrequencyTask } from '@/api/frequency-api'
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
  await pageFrequencyTask(queryConditions).then((data) => {
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
    label: '任务名称',
    placeholder: '请输入任务名称',
    width: '120px',
    clearable: true,
  },
]

// 表格列元数据
const columns = [
  { prop: 'name', label: '任务名称', width: '120', showOverflowTooltip: true },
  { prop: 'startTime', label: '开始时间', width: '180', showOverflowTooltip: true },
  { prop: 'endTime', label: '结束时间', width: '180', showOverflowTooltip: true },
  { prop: 'pushNum', label: '推送次数', width: '100' },
  { prop: 'num', label: '提醒次数', width: '100' },
  { prop: 'remark', label: '备注', width: 'auto', minWidth: '100', showOverflowTooltip: true },
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

const cycleUnitSwitch = (e) => {
  switch (e) {
    case 'hour':
      return '小时'
    case 'day':
      return '天'
    case 'week':
      return '周'
    case 'month':
      return '月'
    default:
      return false
  }
}

const typeSwitch = (e) => {
  switch (e) {
    case 'NATURAL_WEEK':
      return '自然周'
    case 'LOGIC_WEEK':
      return '逻辑周'
    default:
      return '未使用'
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
      <template #cycleUnit="{ row }">
        <span>{{ cycleUnitSwitch(row.cycleUnit) }}</span>
      </template>
      <template #type="{ row }">
        <span>{{ typeSwitch(row.type) }}</span>
      </template>

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
