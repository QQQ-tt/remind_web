<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { pageFrequencyRule, saveOrUpdateFrequencyRule } from '@/api/frequency-api'
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
  await pageFrequencyRule(queryConditions).then((data) => {
    tableData.value = data.data.data.records
    tableData.total = data.data.data.total
  })
}
// 初始化数据
const initData = async () => {
  await handleSearch(1, 10)
}

// 重置功能
const handleReset = () => {
  queryConditions.name = ''
  initData()
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
    label: '规则名称',
    placeholder: '请输入规则名称',
    width: '120px',
    clearable: true,
  },
]

// 表格列元数据
const columns = [
  { prop: 'name', label: '频次名称', width: '120', showOverflowTooltip: true },
  { prop: 'frequencyCode', label: '频次编码', width: '100', showOverflowTooltip: true },
  { prop: 'frequencyNumber', label: '执行次数', width: '100' },
  { prop: 'frequencyCycle', label: '频次周期', width: '100' },
  { prop: 'cycleUnit', label: '周期单位', width: '100' },
  { prop: 'type', label: '开始方式', width: '100', showOverflowTooltip: true },
  { prop: 'status', label: '频次状态', width: '100', showOverflowTooltip: true },
  { prop: 'frequencyDesc', label: '频次描述', width: 'auto', minWidth: '100', showOverflowTooltip: true },
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
    case 'HOUR':
      return '小时'
    case 'DAY':
      return '天'
    case 'WEEK':
      return '周'
    case 'MONTH':
      return '月'
    default:
      return ''
  }
}

const typeSwitch = (e) => {
  switch (e) {
    case 'NATURAL_WEEK':
      return '自然周'
    case 'LOGIC_WEEK':
      return '逻辑周'
    default:
      return ''
  }
}

// 新增
const drawer = ref(false)
const handleAdd = () => {
  drawer.value = true
}

const addFrom = reactive({
  id: '',
  frequencyName: '',
  frequencyCode: '',
  frequencyDesc: '',
  frequencyNumber: '',
  frequencyCycle: '',
  cycleUnit: '',
  type: '',
  status: 'false',
  remark: '',
})

// 取消
const handleCancel = () => {
  drawer.value = false
}

// 提交
const loading = ref(false)
const handleSubmit = () => {
  loading.value = true
  saveOrUpdateFrequencyRule(addFrom).then(() => {
    handleCancel()
    initData()
    loading.value = false
  }).catch(() => {
    loading.value = false
  })
}

// 新增表单元数据（计算属性）
const addformItems = computed(() => [
  {
    type: 'input',
    model: 'frequencyName',
    label: '频次名称',
    placeholder: '请输入频次名称',
    width: '180px',
    clearable: true,
  },
  {
    type: 'input',
    model: 'frequencyCode',
    label: '频次编码',
    placeholder: '请输入频次编码',
    width: '180px',
    clearable: true,
  },
  {
    type: 'input',
    model: 'frequencyNumber',
    label: '执行次数',
    placeholder: '请输入执行次数',
    width: '180px',
    clearable: true,
  },
  {
    type: 'input',
    model: 'frequencyCycle',
    label: '频次周期',
    placeholder: '请输入频次周期',
    width: '180px',
    clearable: true,
  },
  {
    type: 'select',
    model: 'cycleUnit',
    label: '周期单位',
    placeholder: '请选择周期单位',
    width: '180px',
    clearable: true,
    options: [
      { label: '小时', value: 'HOUR' },
      { label: '天', value: 'DAY' },
      { label: '周', value: 'WEEK' },
      { label: '月', value: 'MONTH' },
    ],
  },
  ...(addFrom.cycleUnit === 'WEEK' ? [
    {
      type: 'select',
      model: 'type',
      label: '开始方式',
      placeholder: '请选择开始方式',
      width: '180px',
      clearable: true,
      options: [
        { label: '自然周', value: 'NATURAL_WEEK' },
        { label: '逻辑周', value: 'LOGIC_WEEK' },
      ],
    },] : []),
  {
    type: 'switch',
    model: 'status',
    label: '频次状态',
  },
  {
    type: 'input',
    model: 'frequencyDesc',
    label: '频次描述',
    placeholder: '请输入频次描述',
    input_type: 'textarea',
    width: '180px',
  },
])

onMounted(() => {
  initData()
})
</script>

<template>
  <div class="sidebar-wrapper">
    <component-query-from v-model="queryConditions" :handleSearch="handleSearch" :handleReset="handleReset"
      :form-items="formItems" />
  </div>
  <div class="sidebar-wrapper right-align">
    <el-button type="primary" @click="handleAdd">新增</el-button>
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
  <component-add-from v-model:drawer="drawer" v-model:addFrom="addFrom" v-model:loading="loading"
    :addformItems="addformItems" :handleCancel="handleCancel" :handleSubmit="handleSubmit" />
</template>

<style scoped>
@import '../../style/from-table.css';
</style>
