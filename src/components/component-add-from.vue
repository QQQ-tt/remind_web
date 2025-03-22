<script setup>
const props = defineProps({
  addformItems: Array,
  handleCancel: Function,
  handleSubmit: Function,
});
const addFrom = defineModel('addFrom')
const drawer = defineModel('drawer')

// 自定义清除事件处理函数
const handleClear = (model, str) => {
  addFrom.value[model] = str;
}
</script>
<template>
  <el-drawer v-model="drawer" title="新增" direction="rtl">
    <el-form :label-width="80">
      <el-form-item v-for="(item, index) in props.addformItems" :key="index" :label="item.label">
        <el-input v-if="item.type === 'input'" v-model="addFrom[item.model]" :placeholder="item.placeholder"
          :clearable="item.clearable" :style="{ width: item.width || '100%' }" :type="item.input_type" />
        <el-select v-if="item.type === 'select'" v-model="addFrom[item.model]" :placeholder="item.placeholder"
          :clearable="item.clearable" :style="{ width: item.width || '100%' }">
          <el-option v-for="(opt, idx) in item.options" :key="idx" :label="opt.label" :value="opt.value" />
        </el-select>
        <el-tree-select v-if="item.type === 'tree-select'" @clear="handleClear(item.model, item.clearableValue)"
          v-model="addFrom[item.model]" :placeholder="item.placeholder" :check-strictly="item.checkStrictly"
          :clearable="item.clearable" :style="{ width: item.width || '100%' }" :data="item.data" :props="item.props" />
      </el-form-item>
    </el-form>
    <div class="form-buttons">
      <el-button type="primary" @click="handleSubmit">
        提交
      </el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </el-drawer>
</template>

<style scoped>
.form-buttons {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 20px;
  right: 20px;
  /* 适应 drawer 的 padding */
  width: calc(100% - 40px);
}
</style>
