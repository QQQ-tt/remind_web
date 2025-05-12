<script setup>
import { reactive, ref, onMounted, computed, watch } from 'vue'
import { pageFrequencyDetail, saveOrUpdateFrequencyDetail, removeFrequencyDetailById } from '@/api/frequency-api'
import ComponentPage from '@/components/component-page.vue'
import ComponentQueryTable from '@/components/component-query-table.vue'
import ElBoxMsg from '@/util/el-box-msg'

const frequencyId = defineModel('frequencyId')
const cycleUnit = defineModel('cycleUnit')

const queryConditions = reactive({
  pageNo: 1,
  pageSize: 10,
  frequencyId: frequencyId,
})

// 搜索功能
const handleSearch = async (pageNo, pageSize) => {
  // Removed redundant self-assignment
  tableData.value = []
  tableData.total = 0
  queryConditions.pageNo = pageNo || 1
  queryConditions.pageSize = pageSize || 10
  await pageFrequencyDetail(queryConditions).then((data) => {
    if (data.data.data.records !== null && data.data.data.records !== undefined) {
      tableData.value = data.data.data.records
    } else {
      tableData.value = []
    }
    tableData.total = data.data.data.total
  })
}
// 初始化数据
const initData = async () => {
  await handleSearch(1, 10)
}

const tableData = reactive({
  value: [],
  total: 0,
})

// 查看、编辑、删除功能的占位函数
const handleDelete = (index, row) => {
  ElBoxMsg.confirmAction('确定删除该频率吗？', () => {
    removeFrequencyDetailById(row.id).then(() => {
      initData()
    })
  }
  )
}

// 表格列元数据
const columns = [
  { prop: 'frequencyWeekday', label: '星期/天', width: '100', showOverflowTooltip: true },
  { prop: 'frequencyTime', label: '提醒时间(HH:mm)', width: '100' },
  { prop: 'beforeRuleTime', label: '首次提醒时间设置(前)(HH:mm)', width: '150' },
  { prop: 'afterRuleTime', label: '首次提醒时间设置(后)(HH:mm)', width: '150' },
  { prop: 'frequencyTimeName', label: '时间字符串', width: 'auto', showOverflowTooltip: true },
]

// 新增
const drawer = ref(false)
const update = ref(false)
const handleAdd = () => {
  drawer.value = true
}

const addFrom = reactive({
  id: '',
  frequencyId: frequencyId,
  frequencyWeekday: '',
  frequencyTime: '',
  beforeRuleTime: '',
  afterRuleTime: '',
})

// 取消
const handleCancel = () => {
  drawer.value = false
}

// 提交
const loading = ref(false)
const handleSubmit = () => {
  loading.value = true
  saveOrUpdateFrequencyDetail(addFrom).then(() => {
    handleCancel()
    initData()
    loading.value = false
  }).catch(() => {
    loading.value = false
  })
}
// 编辑
const handleEdit = (index, row) => {
  update.value = true
  addFrom.id = row.id
  addFrom.frequencyId = row.frequencyId
  addFrom.frequencyWeekday = row.frequencyWeekday
  addFrom.frequencyTime = row.frequencyTime
  addFrom.beforeRuleTime = row.beforeRuleTime
  addFrom.afterRuleTime = row.afterRuleTime
  drawer.value = true
}

// 新增表单元数据（计算属性）
const addformItems = computed(() => [
  {
    type: 'time',
    model: 'frequencyTime',
    label: '提醒时间',
    placeholder: '请输入选择时间',
    width: '180px',
    format: 'HH:mm:ss',
  },
  ...(cycleUnit.value === 'WEEK' ? [
    {
      type: 'select',
      model: 'frequencyWeekday',
      label: '星期',
      placeholder: '请选择星期',
      width: '180px',
      clearable: true,
      options: [
        { label: '星期一', value: '1' },
        { label: '星期二', value: '2' },
        { label: '星期三', value: '3' },
        { label: '星期四', value: '4' },
        { label: '星期五', value: '5' },
        { label: '星期六', value: '6' },
        { label: '星期日', value: '7' },
      ],
    }
  ] : []),
  ...(cycleUnit.value === 'MONTH' ? [
    {
      type: 'select',
      model: 'frequencyWeekday',
      label: '日期',
      placeholder: '请选择日期',
      width: '180px',
      clearable: true,
      options: Array.from({ length: 31 }, (_, i) => ({
        label: `${i + 1}日`,
        value: `${i + 1}`,
      })),
    },
  ] : []
  ),
  {
    type: 'time',
    model: 'beforeRuleTime',
    label: '首次(前)',
    placeholder: '请输入选择时间',
    width: '180px',
    format: 'HH:mm:ss',
  },
  {
    type: 'time',
    model: 'afterRuleTime',
    label: '首次(后)',
    placeholder: '请输入选择时间',
    width: '180px',
    format: 'HH:mm:ss',
  },
])

const actions = [
  { label: '编辑', handler: handleEdit },
  { label: '删除', type: 'danger', handler: handleDelete }
]

// 定义表单校验规则
const rules = reactive({
  frequencyTime: [
    { required: true, message: '请选择时间', trigger: 'blur' },
  ],
  frequencyWeekday: [
    { required: cycleUnit.value === 'WEEK', message: '请选择星期', trigger: 'blur' },
    { required: cycleUnit.value === 'MONTH', message: '请选择日期', trigger: 'blur' },
  ],
})

onMounted(() => {
  initData()
})

watch(
  () => frequencyId.value,
  () => {
    initData()
  },
  { immediate: true }
)
</script>

<template>
  <div class="right-align" style="margin-top: 0px;">
    <el-button type="primary" @click="handleAdd">新增</el-button>
  </div>
  <div class="sidebar-wrapper table-pagination-container">
    <component-query-table :tableData="tableData.value" :columns="columns" :actions="actions" />
    <div class="pagination-wrap">
      <component-page :total="tableData.total" :list-page="handleSearch" />
    </div>
  </div>
  <component-add-from v-model:drawer="drawer" v-model:addFrom="addFrom" v-model:loading="loading"
    :addformItems="addformItems" :handleCancel="handleCancel" :handleSubmit="handleSubmit" :rules="rules" />
</template>

<style scoped>
@import '../../style/from-table.css';
</style>
