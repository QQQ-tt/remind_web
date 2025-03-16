<script setup>
import { reactive } from 'vue';

// 定义查询条件的响应式对象
const queryConditions = reactive({
  name: '',
  account: '',
  telephone: '',
  status: null,
  userType: 'sys'
});
</script>

<template>
  <div class="sidebar-wrapper">
    <el-form :model="queryConditions" class="form-horizontal">
      <el-form-item label="用户名称" class="auto-width">
        <el-input v-model="queryConditions.name" placeholder="请输入用户名称" class="custom-input"></el-input>
      </el-form-item>
      <el-form-item label="账户" class="auto-width">
        <el-input v-model="queryConditions.account" placeholder="请输入账户" class="custom-input"></el-input>
      </el-form-item>
      <el-form-item label="电话" class="auto-width">
        <el-input v-model="queryConditions.telephone" placeholder="请输入电话" class="custom-input"></el-input>
      </el-form-item>
      <el-form-item label="状态" class="auto-width">
        <el-select v-model="queryConditions.status" placeholder="请选择状态" class="custom-input">
          <el-option label="启用" :value="true"></el-option>
          <el-option label="禁用" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户类型" class="auto-width">
        <el-select v-model="queryConditions.userType" placeholder="请选择用户类型" class="custom-input">
          <el-option label="系统用户" value="sys"></el-option>
          <el-option label="普通用户" value="user"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="button-container">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
/* 外部容器 */
.sidebar-wrapper {
  background: white;
  border-radius: 12px;
  padding: 5px 10px 0;
  display: flex;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* 更强的阴影 */
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
