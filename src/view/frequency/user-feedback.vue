<script setup>
import ComponentQueryFrom from '@/components/component-query-from.vue'
import ComponentQueryTable from '@/components/component-query-table.vue'
import ComponentPage from '@/components/component-page.vue'
import { pageUserFeedback, handlingComments } from '@/api/frequency-api.js'
import { onMounted, reactive, ref } from 'vue'
import ComponentAddFrom from '@/components/component-add-from.vue'
// 定义查询条件的响应式对象
const queryConditions = reactive({
  title: '',
  type: '',
  content: '',
  pageNo: 1,
  pageSize: 10,
})

// 搜索功能
const handleSearch = async (pageNo, pageSize) => {
  queryConditions.pageNo = pageNo || 1
  queryConditions.pageSize = pageSize || 10
  await pageUserFeedback(queryConditions).then((data) => {
    if (data.data.data.records !== null && data.data.data.records !== undefined) {
      tableData.value = data.data.data.records
    } else {
      tableData.value = []
    }
    tableData.total = data.data.data.total
  })
}

const tableData = reactive({
  value: [],
  total: 0,
})

// 初始化数据
const initData = async () => {
  await handleSearch(1, 10)
}

// 重置功能
const handleReset = () => {
  queryConditions.title = ''
  queryConditions.type = ''
  queryConditions.content = ''
  initData()
}

const drawer = ref(false)
const loading = ref(false)
const editForm = reactive({
  id: '',
  adopted: '',
  reply: '',
})

// 编辑
const handleEdit = async (index, row) => {
  editForm.id = row.id
  drawer.value = true
}

// 取消
const handleCancel = () => {
  drawer.value = false
  editForm.id = ''
}

// 提交
const handleSubmit = async () => {
  loading.value = true
  handlingComments(editForm).then(() => {
    handleCancel()
    initData()
    loading.value = false
  }).catch(() => {
    loading.value = false
  })
}

const adoptedConverted = (e) => {
  switch (e) {
    case 0:
      return '待处理'
    case 1:
      return '已处理'
    case 2:
      return '已采纳'
    default:
      return ''
  }
}

// 表单元数据
const formItems = [
  {
    type: 'input',
    model: 'title',
    label: '标题',
    placeholder: '请输入标题',
    width: '120px',
    clearable: true,
  },
  {
    type: 'input',
    model: 'content',
    label: '内容',
    placeholder: '请输入内容',
    width: '100px',
    clearable: true,
  },
  {
    type: 'select',
    model: 'type',
    label: '类型',
    clearable: true,
    width: '100px',
    placeholder: '请选择反馈类型',
    options: [
      { label: 'bug', value: 1 },
      { label: '意见', value: 2 },
    ],
  },
  {
    type: 'select',
    model: 'adopted',
    label: '处理结果',
    clearable: true,
    width: '100px',
    placeholder: '请选择反馈类型',
    options: [
      { label: '待处理', value: 0 },
      { label: '已处理', value: 1 },
      { label: '已采纳', value: 2 },
    ],
  },
]

// 表格列元数据
const columns = [
  { prop: 'title', label: '标题', width: '100', showOverflowTooltip: true },
  { prop: 'type', label: '反馈类型', width: '120' },
  { prop: 'adopted', label: '处理结果', width: '100' },
  { prop: 'content', label: '具体内容', width: 'auto', showOverflowTooltip: true },
  {
    prop: 'createName',
    label: '创建人',
    width: '100',
    showOverflowTooltip: true,
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: '180',
    showOverflowTooltip: true,
    sortable: true,
  },
  {
    prop: 'updateName',
    label: '更新人',
    width: '100',
    showOverflowTooltip: true,
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    width: '180',
    showOverflowTooltip: true,
    sortable: true,
  },
]

const updateFormItems = [
  {
    type: 'select',
    model: 'adopted',
    label: '处理结果',
    placeholder: '请选择',
    width: '180px',
    clearable: true,
    options: [
      { label: '已处理', value: 1 },
      { label: '已采纳', value: 2 },
    ],
  },
  {
    type: 'input',
    model: 'reply',
    label: '回复',
    placeholder: '请输入回复内容',
    width: '180px',
    clearable: true,
  },
]

const actions = [{ label: '处理', handler: handleEdit }]

onMounted(() => {
  initData()
})
</script>

<template>
  <div class="sidebar-wrapper">
    <component-query-from v-model="queryConditions" :handleSearch="handleSearch" :handleReset="handleReset"
      :form-items="formItems" />
  </div>
  <div class="sidebar-wrapper table-pagination-container">
    <component-query-table :tableData="tableData.value" :columns="columns" :actions="actions">
      <!-- 自定义状态列 -->
      <template #type="{ row }">
        <el-tag :type="row.type === 1 ? 'warning' : 'primary'">
          {{ row.type ? 'bug' : '意见' }}
        </el-tag>
      </template>
      <!-- 自定义状态列 -->
      <template #adopted="{ row }">
        <span>{{ adoptedConverted(row.adopted) }}</span>
      </template>
    </component-query-table>
    <div class="pagination-wrap">
      <component-page :total="tableData.total" :list-page="handleSearch" />
    </div>
  </div>
  <component-add-from v-model:drawer="drawer" v-model:addFrom="editForm" v-model:loading="loading"
    :addformItems="updateFormItems" :handleCancel="handleCancel" :handleSubmit="handleSubmit" />
</template>

<style scoped>
@import '../../style/from-table.css';
</style>
