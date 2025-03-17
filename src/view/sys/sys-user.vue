<script setup>
import { reactive } from 'vue'
import { pageSysUser } from '@/api/sys-api'
import ComponentPage from '@/components/component-page.vue'

// 定义查询条件的响应式对象
const queryConditions = reactive({
  name: '',
  account: '',
  telephone: '',
  status: '',
  userType: 'sys',
  pageNo: 1,
  pageSize: 10,
  sortField: 'createTime',
})

// 搜索功能
const handleSearch = async (pageNo, pageSize) => {
  queryConditions.pageNo = pageNo || 1
  queryConditions.pageSize = pageSize || 10
  console.log('搜索条件:', queryConditions)
  await pageSysUser(queryConditions).then((data) => {
    console.log('搜索结果:', data.data.data.records)
    tableData.value = data.data.data.records
    tableData.total = data.data.data.total
  })
  console.log('tableData:', tableData.value)
}

// 初始化数据
handleSearch(1, 10)

// 重置功能
const handleReset = () => {
  queryConditions.name = ''
  queryConditions.account = ''
  queryConditions.telephone = ''
  queryConditions.status = ''
  queryConditions.userType = 'sys'
}

const tableData = reactive({
  value: [],
  total: 0,
})

const getType = (s) => {
  if (s === true) {
    return 'success'
  } else {
    return 'danger'
  }
}

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
</script>

<template>
  <div class="sidebar-wrapper">
    <el-form :model="queryConditions" class="form-horizontal">
      <el-form-item label="用户名称" class="auto-width">
        <el-input
          v-model="queryConditions.name"
          placeholder="请输入用户名称"
          class="custom-input"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="账户" class="auto-width">
        <el-input
          v-model="queryConditions.account"
          placeholder="请输入账户"
          class="custom-input"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="电话" class="auto-width">
        <el-input
          v-model="queryConditions.telephone"
          placeholder="请输入电话"
          class="custom-input"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" class="auto-width">
        <el-select
          v-model="queryConditions.status"
          placeholder="请选择状态"
          class="custom-input"
          clearable
        >
          <el-option label="启用" :value="true"></el-option>
          <el-option label="禁用" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户类型" class="auto-width">
        <el-select
          v-model="queryConditions.userType"
          placeholder="请选择用户类型"
          class="custom-input"
        >
          <el-option label="系统用户" value="sys"></el-option>
          <el-option label="普通用户" value="user"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="button-container">
      <el-button
        type="primary"
        @click="handleSearch(queryConditions.pageNo, queryConditions.pageSize)"
        >搜索
      </el-button>
      <el-button @click="handleReset">重置</el-button>
    </div>
  </div>
  <div class="sidebar-wrapper table-pagination-container">
    <el-table :data="tableData.value" style="width: 100%" border stripe>
      <el-table-column prop="name" label="用户名称" width="100" />
      <el-table-column prop="account" label="账户" width="120" />
      <el-table-column prop="telephone" label="电话" width="120" />
      <el-table-column prop="status" label="状态" width="80">
        <template #default="scope">
          <el-tag :type="getType(scope.row.status)">
            <span>{{ scope.row.status ? '启用' : '禁用' }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="userType" label="用户类型" width="100">
        <template #default="scope">
          <span>{{ scope.row.userType === 'sys' ? '系统用户' : '普通用户' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="updateTime" show-overflow-tooltip label="更新时间" width="auto" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="handleView(scope.$index, scope.row)">查看</el-button>
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrap">
      <component-page :total="tableData.total" :list-page="handleSearch" />
    </div>
  </div>
</template>

<style scoped>
/* 外部容器 */
.sidebar-wrapper {
  margin-top: 10px;
  background: white;
  border-radius: 12px;
  padding: 5px 10px 0;
  display: flex;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* 更强的阴影 */
}

.table-pagination-container {
  position: relative; /* 开启相对定位 */
  min-height: 440px; /* 给容器设置最小高度，避免内容不足时定位异常 */
}

/* 让表单项在一行内自适应 */
.form-horizontal {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* 控制表单项间距 */
}

/* 让输入框和 label 居中 */
.el-form-item {
  display: flex;
  align-items: center; /* 保持 label 和 input 垂直居中 */
  margin-bottom: 6px;
}

/* 让输入框宽度适中 */
.custom-input {
  min-width: 120px;
  flex: 1;
}

/* 按钮容器样式 */
.button-container {
  display: flex;
  margin-left: auto;
}

.pagination-wrap {
  position: absolute;
  right: 10px; /* 距离右侧间距 */
  bottom: 10px; /* 距离底部间距 */
}

/* 响应式处理，防止小屏幕变形 */
@media (max-width: 600px) {
  .form-horizontal {
    flex-direction: column;
  }

  .el-form-item {
    width: 100%;
  }

  .custom-input {
    width: 100%;
  }
}
</style>
