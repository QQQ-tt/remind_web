<script setup>
import { reactive, ref, onMounted } from 'vue'
import { pageSysUserRule, getRuleUserByUserId } from '@/api/rule-api.js'
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
  await pageSysUserRule(queryConditions).then((data) => {
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

const dialogTableVisible = ref(false)
const dialogTableData = reactive({
  value: []
})

const handleView = async (index, row) => {
  await getRuleUserByUserId(row.id).then((data) => {
    if (data.data.data !== null && data.data.data !== undefined) {
      dialogTableData.value = data.data.data
      dialogTableVisible.value = true
    } else {
      dialogTableData.value = []
    }
  }).catch((error) => {
    console.error('Error fetching user rule data:', error)
  })
}

const dialogColumns = [
  { prop: 'name', label: '权益名称', width: 'auto', showOverflowTooltip: true },
  { prop: 'useValue', label: '已使用', width: '100', showOverflowTooltip: true },
  { prop: 'value', label: '默认值', width: '100', showOverflowTooltip: true },
  { prop: 'startedAt', label: '开始时间', width: '180', showOverflowTooltip: true },
  { prop: 'expiredAt', label: '过期时间', width: '180', showOverflowTooltip: true },
  { prop: 'priority', label: '优先级', width: '100', showOverflowTooltip: true },
]

// 表单元数据
const formItems = [
  {
    type: 'input',
    model: 'name',
    label: '用户名称',
    placeholder: '请输入用户名称',
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
    ],
  },
]

// 表格列元数据
const columns = [
  { prop: 'name', label: '规则名称', width: '100', showOverflowTooltip: true },
  { prop: 'avatar', label: '头像', width: '70' },
  { prop: 'account', label: '账户', width: '120' },
  { prop: 'openId', label: '微信openId', width: '300' },
  { prop: 'interestsLevel', label: '权益等级', width: '100' },
  {
    prop: 'loginTime',
    label: '登录时间',
    width: 'auto',
    showOverflowTooltip: true,
    sortable: true,
  },
]

const actions = [
  { label: '查看权益', handler: handleView },
]

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
      <template #avatar="{ row }">
        <img :src="row.avatar" alt="头像" class="avatar" />
      </template>
    </component-query-table>
    <div class="pagination-wrap">
      <component-page :total="tableData.total" :list-page="handleSearch" />
    </div>
  </div>

  <el-dialog v-model="dialogTableVisible" title="权益详情" width="900">
    <!-- 表格视图 -->
    <component-query-table :tableData="dialogTableData.value" :columns="dialogColumns" />
  </el-dialog>
</template>

<style scoped>
@import '../../style/from-table.css';

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
