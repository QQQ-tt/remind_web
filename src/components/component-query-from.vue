<script setup>
const props = defineProps({
  formItems: Array,
  handleSearch: Function,
  handleReset: Function,
});

const model = defineModel()
</script>

<template>
  <el-form class="form-horizontal">
    <el-form-item v-for="(item, index) in props.formItems" :key="index" :label="item.label" class="auto-width">
      <el-input v-if="item.type === 'input'" v-model="model[item.model]" :placeholder="item.placeholder"
        class="custom-input" :clearable="item.clearable" :style="{ width: item.width || '100%' }" />
      <el-select v-if="item.type === 'select'" v-model="model[item.model]" :placeholder="item.placeholder"
        class="custom-input" :clearable="item.clearable" :style="{ width: item.width || '100%' }">
        <el-option v-for="(opt, idx) in item.options" :key="idx" :label="opt.label" :value="opt.value" />
      </el-select>
    </el-form-item>
    <el-form-item style="margin-left: auto;">
      <el-button type="primary" @click="props.handleSearch(model.pageNo, model.pageSize)">
        搜索
      </el-button>
      <el-button @click="props.handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
