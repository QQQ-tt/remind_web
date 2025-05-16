<script setup>
import { reactive, ref, onMounted, computed, nextTick } from 'vue'
import { pageSysRole, saveOrUpdateSysRole, removeSysRoleByRoleId, treeResource, saveRoleResource, listRoleResourceByRoleId } from '@/api/sys-api.js'
import ComponentPage from '@/components/component-page.vue'
import ComponentQueryFrom from '@/components/component-query-from.vue'
import ComponentQueryTable from '@/components/component-query-table.vue'
import ComponentAddFrom from '@/components/component-add-from.vue'
import ElBoxMsg from '@/util/el-box-msg'

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
  initData()
}

const tableData = reactive({
  value: [],
  total: 0,
})

const handleDelete = (index, row) => {
  ElBoxMsg.confirmAction('确定删除该角色吗？', () => {
    removeSysRoleByRoleId(row.id).then(() => {
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

// 新增
const drawer = ref(false)
const handleAdd = () => {
  drawer.value = true
}

const addFrom = reactive({
  id: '',
  name: '',
  status: 'false',
  remark: '',
})

// 提交
const loading = ref(false)
const handleSubmit = () => {
  loading.value = true
  saveOrUpdateSysRole(addFrom).then(() => {
    initData()
    handleCancel()
    loading.value = false
  }).catch(() => {
    loading.value = false
  })
}
// 编辑
const handleEdit = (index, row) => {
  addFrom.id = row.id
  addFrom.name = row.name
  addFrom.status = row.status
  addFrom.remark = row.remark
  drawer.value = true
}

// 资源初始化
const treeData = ref([])
const initTreeData = async () => {
  await treeResource().then((data) => {
    treeData.value = data.data.data
  })
}

const treeRef = ref(null)
const resourceDrwaer = ref(false)
const addResource = reactive({
  sysRoleId: '',
  sysResources: [],
})
// 设置资源
const handleResource = async (index, row) => {
  addResource.sysRoleId = row.id
  await listRoleResourceByRoleId(row.id).then((data) => {
    addResource.sysResources = data.data.data
  })
  resourceDrwaer.value = true
  nextTick(() => {
    if (treeRef.value[0]) {
      treeRef.value[0].setCheckedKeys(addResource.sysResources || []);
    } else {
      console.error('treeRef 未找到');
    }
  });
}

const handleSubmitResource = () => {
  loading.value = true
  if (treeRef.value[0]) {
    addResource.sysResources = treeRef.value[0].getCheckedKeys()
  } else {
    console.error('treeRef 未找到');
  }
  console.log(addResource.sysResources)
  saveRoleResource(addResource).then(() => {
    resourceDrwaer.value = false
  }).catch(() => {
    loading.value = false
  })
  resourceDrwaer.value = false
  loading.value = false
}

// 取消
const handleCancel = () => {
  drawer.value = false;
  resourceDrwaer.value = false;
  addFrom.id = ''
}

const resourceItems = computed(() => [
  {
    type: 'tree',
    model: 'sysResources',
    data: treeData.value,
    showCheckbox: true,
    labelWidth: '10',
    clearableValue: [],
    props: {
      children: 'children',
      label: 'name',
      id: 'id',
    },
  }
])

const actions = [
  { label: '设置资源', handler: handleResource },
  { label: '编辑', handler: handleEdit },
  { label: '删除', type: 'danger', handler: handleDelete },
]

const addformItems = [
  {
    type: 'input',
    model: 'name',
    label: '用户名称',
    placeholder: '请输入用户名称',
    width: '180px',
    clearable: true,
  },
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
]

// 定义表单校验规则
const rules = reactive({
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
  ],
})

onMounted(() => {
  initData()
  initTreeData()
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
  <component-add-from v-model:drawer="resourceDrwaer" v-model:addFrom="addResource" v-model:loading="loading"
    v-model:treeRef="treeRef" :addformItems="resourceItems" :handleCancel="handleCancel"
    :handleSubmit="handleSubmitResource" />
</template>

<style scoped>
@import '../../style/from-table.css';
</style>
