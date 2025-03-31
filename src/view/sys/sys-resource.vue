<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { pageSysResource, saveOrUpdateSysResource, treeResource, removeSysResourceByResourceId } from '@/api/sys-api.js'
import ComponentPage from '@/components/component-page.vue'
import ComponentQueryFrom from '@/components/component-query-from.vue'
import ComponentQueryTable from '@/components/component-query-table.vue'
import ComponentAddFrom from '@/components/component-add-from.vue'
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
  await pageSysResource(queryConditions).then((data) => {
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
  ElBoxMsg.confirmAction('确定删除该资源吗？', () => {
    removeSysResourceByResourceId(row.id).then(() => {
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
  { prop: 'type', label: '资源类型', width: '100', showOverflowTooltip: true },
  { prop: 'icon', label: '图标', width: '100', showOverflowTooltip: true },
  { prop: 'method', label: '方法类型', width: '100', showOverflowTooltip: true },
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
      return 'primary'
  }
}
const getTagEffect = (e) => {
  switch (e) {
    case 'route':
      return 'light'
    case 'api':
      return 'plain'
    default:
      return 'plain'
  }
}

// 新增
const drawer = ref(false)
const handleAdd = () => {
  drawer.value = true
}
// 编辑
const handleEdit = (index, row) => {
  addFrom.id = row.id
  addFrom.name = row.name
  addFrom.url = row.url
  addFrom.type = row.type
  addFrom.icon = row.icon
  addFrom.method = row.method
  addFrom.description = row.description
  addFrom.status = row.status
  addFrom.parentId = row.parentId
  drawer.value = true
}
const addFrom = reactive({
  id: '',
  name: '',
  url: '',
  type: '',
  icon: '',
  method: '',
  description: '',
  status: 'false',
  parentId: 0,
})

// 取消
const handleCancel = () => {
  drawer.value = false
  addFrom.name = ''
  addFrom.url = ''
  addFrom.type = ''
  addFrom.icon = ''
  addFrom.method = ''
  addFrom.description = ''
  addFrom.status = 'false'
  addFrom.parentId = 0
}

// 提交
const loading = ref(false)
const handleSubmit = () => {
  loading.value = true
  saveOrUpdateSysResource(addFrom).then(() => {
    handleCancel()
    initData()
    loading.value = false
  }).catch(() => {
    loading.value = false
  })
}

// 路由列表
let treeRoute = ref([])
const rolesList = async () => {
  await treeResource('route').then((data) => {
    treeRoute.value = data.data.data
  })
}
// 计算属性
const addformItems = computed(() => [
  {
    type: 'tree-select',
    model: 'parentId',
    label: '上级资源',
    placeholder: '请选择',
    checkStrictly: true,
    clearable: true,
    clearableValue: 0,
    width: '180px',
    // 记得加上value
    data: treeRoute.value,
    props: {
      label: 'name',
      value: 'id',
      children: 'children'
    }
  },
  {
    type: 'input',
    model: 'name',
    label: '资源名称',
    placeholder: '请输入资源名称',
    width: '180px',
    clearable: true,
  },
  {
    type: 'input',
    model: 'url',
    label: '地址',
    placeholder: '请输入接口地址/路由地址',
    width: '300px',
    clearable: true,
  },
  {
    type: 'select',
    model: 'type',
    label: '资源类型',
    clearable: true,
    width: '180px',
    placeholder: '请选择资源类型',
    options: [
      { label: '路由', value: 'route' },
      { label: '接口', value: 'api' },
    ],
  },
  // **如果选择的是路由，才显示图标**
  ...(addFrom.type === 'route'
    ? [
      {
        type: 'input',
        model: 'icon',
        label: '图标',
        placeholder: '请输入图标',
        width: '180px',
        clearable: true,
      }
    ]
    : []),

  // **如果选择的是接口，才显示方法类型**
  ...(addFrom.type === 'api'
    ? [
      {
        type: 'select',
        model: 'method',
        label: '方法类型',
        placeholder: '请选择方法类型',
        width: '180px',
        clearable: true,
        options: [
          { label: 'GET', value: 'GET' },
          { label: 'POST', value: 'POST' },
          { label: 'PUT', value: 'PUT' },
          { label: 'DELETE', value: 'DELETE' },
        ],
      }
    ]
    : []),
  {
    type: 'input',
    model: 'description',
    label: '详细描述',
    placeholder: '请输入详细描述',
    width: '180px',
    clearable: true,
  },
  {
    type: 'switch',
    model: 'status',
    label: '启用状态',
    clearableValue: false,
  },
])

// 定义表单校验规则
const rules = reactive({
  name: [
    { required: true, message: '请输入资源名称', trigger: 'blur' },
  ],
  url: [
    { required: true, message: '请输入url', trigger: 'blur' },
  ],
  type: [
    { required: true, message: '请输入类型', trigger: 'blur' },
  ],
})

const actions = [
  { label: '编辑', handler: handleEdit },
  { label: '删除', type: 'danger', handler: handleDelete },
]

onMounted(() => {
  initData()
  rolesList()
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
  <component-add-from v-model:drawer="drawer" v-model:addFrom="addFrom" v-model:loading="loading"
    :addformItems="addformItems" :handleCancel="handleCancel" :handleSubmit="handleSubmit" :rules="rules" />
</template>

<style scoped>
@import '../../style/from-table.css';
</style>
