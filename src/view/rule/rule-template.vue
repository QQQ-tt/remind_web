<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { ruleTemplatePage, saveOrUpdateRuleTemplate, updateRuleTemplateStatus } from '@/api/rule-api.js'
import ComponentPage from '@/components/component-page.vue'
import ComponentQueryFrom from '@/components/component-query-from.vue'
import ComponentQueryTable from '@/components/component-query-table.vue'
import ComponentAddFrom from '@/components/component-add-from.vue'

const queryConditions = reactive({
  pageNo: 1,
  pageSize: 10,
  interestsLevel: null,
  status: null,
  name: '',
})

// 搜索功能
const handleSearch = async (pageNo, pageSize) => {
  queryConditions.pageNo = pageNo || 1
  queryConditions.pageSize = pageSize || 10
  await ruleTemplatePage(queryConditions).then((data) => {
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

// 重置功能
const handleReset = () => {
  queryConditions.name = ''
  queryConditions.status = null
  queryConditions.interestsLevel = null
  initData()
}

const tableData = reactive({
  value: [],
  total: 0,
})

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
  {
    type: 'select',
    model: 'interestsLevel',
    label: '权益等级',
    clearable: true,
    width: '150px',
    placeholder: '请选择等级',
    options: [
      { label: 'vip_0', value: 'vip_0' },
      { label: 'vip_1', value: 'vip_1' },
      { label: 'ad_boost', value: 'ad_boost' },
    ],
  },
  {
    type: 'select',
    model: 'status',
    label: '状态',
    clearable: true,
    width: '150px',
    placeholder: '请选择状态',
    options: [
      { label: '启用', value: true },
      { label: '禁用', value: false },
    ],
  },
]

// 表格列元数据
const columns = [
  { prop: 'code', label: '规则编码', width: '100', showOverflowTooltip: true },
  { prop: 'name', label: '规则名称', width: '100', showOverflowTooltip: true },
  { prop: 'status', label: '状态', width: '80' },
  { prop: 'value', label: '默认值', width: '80' },
  { prop: 'ruleType', label: '权益类型', width: '100', showOverflowTooltip: true },
  { prop: 'interestsLevel', label: '权益等级', width: '100' },
  { prop: 'priority', label: '优先级', width: '80' },
  { prop: 'description', label: '描述', width: 'auto', showOverflowTooltip: true },
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

// 新增
const drawer = ref(false)
const handleAdd = () => {
  drawer.value = true
}

const addFrom = reactive({
  id: '',
  name: '',
  code: '',
  value: '',
  ruleType: '',
  interestsLevel: '',
  priority: '',
  description: '',
  expiredPeriodValue: '',
  expiredPeriodUnit: 'UNKNOWN',
  expiredPeriodType: '',
  status: 'false',
})

// 提交
const loading = ref(false)
const handleSubmit = () => {
  loading.value = true
  saveOrUpdateRuleTemplate(addFrom).then(() => {
    initData()
    handleCancel()
    loading.value = false
  }).catch(() => {
    loading.value = false
  })
}

const handleStatusChange = (row, val) => {
  updateRuleTemplateStatus({ id: row.id, status: val }).then(() => {
    handleSearch(queryConditions.pageNo, queryConditions.pageSize)
  })
}

// 编辑
const handleEdit = (index, row) => {
  addFrom.id = row.id
  addFrom.name = row.name
  addFrom.code = row.code
  addFrom.value = row.value
  addFrom.ruleType = row.ruleType
  addFrom.interestsLevel = row.interestsLevel
  addFrom.priority = row.priority
  addFrom.status = row.status
  addFrom.description = row.description
  addFrom.expiredPeriodValue = row.expiredPeriodValue
  addFrom.expiredPeriodUnit = row.expiredPeriodUnit
  addFrom.expiredPeriodType = row.expiredPeriodType
  drawer.value = true
}

// 取消
const handleCancel = () => {
  drawer.value = false;
  addFrom.id = ''
}

const actions = [
  { label: '编辑', handler: handleEdit },
]

const addformItems = computed(() => [
  {
    type: 'input',
    model: 'name',
    label: '规则名称',
    placeholder: '请输入规则名称',
    width: '180px',
    clearable: true,
  },
  {
    type: 'input',
    model: 'code',
    label: '规则编码',
    placeholder: '请输入规则编码',
    width: '180px',
    clearable: true,
  },
  {
    type: 'input',
    model: 'value',
    label: '默认值',
    placeholder: '请输入默认值',
    width: '180px',
    clearable: true,
  },
  {
    type: 'select',
    model: 'ruleType',
    label: '权益类型',
    clearable: true,
    width: '180px',
    placeholder: '请选择权益类型',
    options: [
      { label: '进行中任务数量', value: 'limit_continued_task_num' },
      { label: '开启中任务数量', value: 'limit_open_task_num' },
      { label: '提醒规则数量', value: 'limit_time_rule_num' },
      { label: '每天提醒次数', value: 'limit_remind_day_num' },
      { label: '每月提醒次数', value: 'limit_remind_month_num' },
      { label: '插屏广告数量', value: 'limit_ads_num' },
    ],
  },
  {
    type: 'select',
    model: 'interestsLevel',
    label: '权益等级',
    clearable: true,
    width: '180px',
    placeholder: '请选择等级',
    options: [
      { label: 'VIP_0', value: 'VIP_0' },
      { label: 'VIP_1', value: 'VIP_1' },
      { label: 'VIP_2', value: 'VIP_2' },
      { label: 'AD_BOOST', value: 'AD_BOOST' },
    ]
  },
  {
    type: 'input',
    model: 'priority',
    label: '优先级',
    placeholder: '请输入优先级',
    width: '180px',
    clearable: true,
  },
  {
    type: 'input',
    model: 'expiredPeriodValue',
    label: '过期数值',
    placeholder: '请输入过期数值',
    width: '180px',
    clearable: true,
  },
  {
    type: 'select',
    model: 'expiredPeriodUnit',
    label: '过期单位',
    clearable: true,
    width: '180px',
    placeholder: '请选择过期单位',
    clearableValue: 'UNKNOWN',
    options: [
      { label: '无', value: 'UNKNOWN' },
      { label: '天', value: 'DAY' },
      { label: '月', value: 'MONTH' },
    ],
  },
  {
    type: 'select',
    model: 'expiredPeriodType',
    label: '过期类型',
    clearable: true,
    width: '180px',
    placeholder: '请选择过期类型',
    options: [
      { label: '累计时间', value: '1' },
      { label: '指定时间', value: '2' },
    ],
  },
  {
    type: 'switch',
    model: 'status',
    label: '状态',
    clearableValue: false,
  },
  {
    type: 'input',
    model: 'description',
    label: '描述',
    placeholder: '请输入频次描述',
    input_type: 'textarea',
    width: '180px',
  },
])

// 定义表单校验规则
const rules = reactive({
  name: [
    { required: true, message: '请输入规则名称', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入规则编码', trigger: 'blur' },
  ],
  value: [
    { required: true, message: '请输入默认值', trigger: 'blur' },
  ],
  ruleType: [
    { required: true, message: '请选择权益类型', trigger: 'blur' },
  ],
  interestsLevel: [
    { required: true, message: '请选择权益等级', trigger: 'blur' },
  ],
  priority: [
    { required: true, message: '请输入优先级', trigger: 'blur' },
  ],
})

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
      <!-- 自定义状态列 -->
      <template #status="{ row }">
        <el-switch v-model="row.status" class="mb-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" inline-prompt :active-text="'启用'"
          :inactive-text="'禁用'" :active-value="true" :inactive-value="false"
          @change="val => handleStatusChange(row, val)" />
      </template>
    </component-query-table>
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
