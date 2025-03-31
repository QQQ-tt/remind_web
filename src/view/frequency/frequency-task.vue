<script setup>
import { reactive, onMounted, ref, computed } from 'vue'
import { pageFrequencyTask, saveOrUpdateTask, listFrequencyRule, removeFrequencyTaskById, pageFrequencyTaskInfo } from '@/api/frequency-api'
import ComponentPage from '@/components/component-page.vue'
import ComponentQueryFrom from '@/components/component-query-from.vue'
import ComponentQueryTable from '@/components/component-query-table.vue'
import ElBoxMsg from '@/util/el-box-msg'

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

// 重置功能
const handleReset = () => {
  queryConditions.name = ''
  initData()
}

const tableData = reactive({
  value: [],
  total: 0,
})

const handleDelete = (index, row) => {
  ElBoxMsg.confirmAction('确定删除该任务吗？', () => {
    removeFrequencyTaskById(row.id).then(() => {
      initData()
    })
  }
  )
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
  { prop: 'status', label: '任务状态', width: '100', showOverflowTooltip: true },
  { prop: 'pushNum', label: '推送次数', width: '100' },
  { prop: 'num', label: '提醒次数', width: '100' },
  { prop: 'isFinish', label: '完成状态', width: '100', showOverflowTooltip: true },
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

// 新增
const drawer = ref(false)
const update = ref(false)
const handleAdd = () => {
  drawer.value = true
}
const addFrom = reactive({
  id: '',
  name: '',
  startTime: '',
  endTime: '',
  remark: '',
  status: false,
  isRemind: false,
  remindType: '',
  frequencyId: '',
  email: '',
  dateRange: [],
})

// 取消
const handleCancel = () => {
  drawer.value = false
}

// 提交
const loading = ref(false)
const handleSubmit = () => {
  loading.value = true
  addFrom.startTime = addFrom.dateRange[0]
  addFrom.endTime = addFrom.dateRange[1]
  const submitData = { ...addFrom }
  delete submitData.dateRange
  if (submitData.isRemind === false) {
    delete submitData.remindType
  }
  saveOrUpdateTask(submitData).then(() => {
    handleCancel()
    initData()
    loading.value = false
  }).catch(() => {
    loading.value = false
  })
}

const handleEdit = (index, row) => {
  update.value = true
  addFrom.id = row.id
  addFrom.name = row.name
  addFrom.status = row.status
  addFrom.remark = row.remark
  drawer.value = true
}

// 频率规则
const frequencyRuleList = ref([])
const getFrequencyRuleList = async () => {
  await listFrequencyRule().then((data) => {
    frequencyRuleList.value = data.data.data.map((item) => ({
      label: item.name,
      value: item.id,
    }))
  })
}

// 查看
const dialogTableData = reactive({
  value: [],
  total: 0,
})
const dialogQueryConditions = reactive({
  id: '',
  remindTaskId: '',
  pageNo: 1,
  pageSize: 10,
})
const dialogTableVisible = ref(false)
const handleView = async (index, row) => {
  dialogTableData.value = []
  dialogTableData.total = 0
  dialogQueryConditions.remindTaskId = row.id
  dialogQueryConditions.pageNo = 1
  dialogQueryConditions.pageSize = 10
  await pageFrequencyTaskInfo(dialogQueryConditions).then((data) => {
    dialogTableData.value = data.data.data.records
    dialogTableData.total = data.data.data.total
    dialogTableVisible.value = true
  }).catch(() => {
    dialogTableVisible.value = false
  })
}

const dialogHandleSearch = async (pageNo, pageSize) => {
  dialogQueryConditions.pageNo = pageNo || 1
  dialogQueryConditions.pageSize = pageSize || 10
  await pageFrequencyTaskInfo(dialogQueryConditions).then((data) => {
    dialogTableData.value = data.data.data.records
    dialogTableData.total = data.data.data.total
  })
}

const dialogColumns = [
  { prop: 'id', label: '任务id', width: '128', showOverflowTooltip: true },
  { prop: 'estimatedTime', label: '预计发送时间', width: '180', showOverflowTooltip: true },
  { prop: 'actualTime', label: '实际发送时间', width: '180', showOverflowTooltip: true },
  { prop: 'time', label: '执行时间', width: '180', showOverflowTooltip: true },
  { prop: 'isSend', label: '是否发送', width: '100', showOverflowTooltip: true },
  { prop: 'isRead', label: '是否已读', width: '100', showOverflowTooltip: true },
]

// 新增表单元数据（计算属性）
const addformItems = computed(() => [
  {
    type: 'input',
    model: 'name',
    label: '任务名称',
    placeholder: '请输入任务名称',
    width: '180px',
    clearable: true,
  },
  ...(update.value ? [] : [{
    type: 'date',
    date_type: 'datetimerange',
    model: 'dateRange',
    label: '选择时间',
    format: 'YYYY-MM-DD HH:mm:ss',
    width: '250px',
  },]),
  {
    type: 'input',
    model: 'remark',
    label: '备注',
    placeholder: '请输入备注',
    input_type: 'textarea',
    width: '180px',
    clearable: true,
  },
  {
    type: 'switch',
    model: 'status',
    label: '启用状态',
    clearableValue: false,
  },
  ...(update.value ? [] : [{
    type: 'switch',
    model: 'isRemind',
    label: '是否提醒',
    clearableValue: false,
  },
  ...(addFrom.isRemind === true ? [{
    type: 'select',
    model: 'remindType',
    label: '提醒类型',
    clearable: true,
    width: '180px',
    placeholder: '请选择提醒类型',
    options: [
      { label: '短信', value: 'remind_text' },
      { label: '邮件', value: 'remind_email' },
      { label: '微信', value: 'remind_wx' },
    ],
  }] : []),
  ...(addFrom.remindType === 'remind_email' ? [{
    type: 'input',
    model: 'email',
    label: '邮件地址',
    clearable: true,
    width: '180px',
    placeholder: '请输入邮件地址',
  }] : []),
  {
    type: 'select',
    model: 'frequencyId',
    label: '频率规则',
    placeholder: '请选择频率',
    width: '180px',
    clearable: true,
    options: frequencyRuleList.value,
  },]),
])

const actions = [
  { label: '查看', handler: handleView },
  { label: '编辑', handler: handleEdit },
  { label: '删除', type: 'danger', handler: handleDelete },
]

// 定义表单校验规则
const rules = reactive({
  name: [
    { required: true, message: '请输入任务名称', trigger: 'blur' },
  ],
  dateRange: [
    { required: true, message: '请选择时间', trigger: 'blur' },
  ],
  frequencyId: [
    { required: true, message: '请选择频率', trigger: 'blur' },
  ],
  remindType: [
    { required: true, message: '请选择频率', trigger: 'blur' },
  ],
})

onMounted(() => {
  initData()
  getFrequencyRuleList()
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
      <template #isFinish="{ row }">
        <el-tag :type="row.isFinish ? 'success' : 'danger'">
          {{ row.isFinish ? '完成' : '未完成' }}
        </el-tag>
      </template>
    </component-query-table>
    <div class="pagination-wrap">
      <component-page :total="tableData.total" :list-page="handleSearch" />
    </div>
  </div>
  <component-add-from v-model:drawer="drawer" v-model:addFrom="addFrom" v-model:loading="loading"
    :addformItems="addformItems" :handleCancel="handleCancel" :handleSubmit="handleSubmit" :rules="rules" />
  <el-dialog v-model="dialogTableVisible" title="Shipping address" width="900" style="padding-bottom: 48px;">
    <component-query-table :tableData="dialogTableData.value" :columns="dialogColumns">
      <template #isSend="{ row }">
        <el-tag :type="row.isSend ? 'success' : 'danger'">
          {{ row.isSend ? '已发送' : '未发送' }}
        </el-tag>
      </template>
      <template #isRead="{ row }">
        <el-tag :type="row.isRead ? 'success' : 'danger'">
          {{ row.isRead ? '已读' : '未读' }}
        </el-tag>
      </template>
    </component-query-table>
    <div class="pagination-wrap">
      <component-page :total="dialogTableData.total" :list-page="dialogHandleSearch" />
    </div>
  </el-dialog>
</template>

<style scoped>
@import '../../style/from-table.css';
</style>
