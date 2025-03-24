<script setup>
import { watch } from "vue";
const props = defineProps({
  addformItems: Array,
  handleCancel: Function,
  handleSubmit: Function,
});
const addFrom = defineModel('addFrom')
const drawer = defineModel('drawer')

watch(drawer, (newVal) => {
  console.log(newVal);
  if (!newVal) {
    props.addformItems.forEach((item) => {
      addFrom.value[item.model] = item.clearableValue !== undefined ? item.clearableValue : ''
    });
  }
});

const handleClear = (model, str) => {
  addFrom.value[model] = str !== undefined ? str : '';
}
</script>
<template>
  <el-drawer v-model="drawer" title="新增" direction="rtl" size="45%">
    <el-form :label-width="80">
      <el-form-item v-for="(item, index) in props.addformItems" :key="index" :label="item.label">
        <el-input v-if="item.type === 'input'" v-model="addFrom[item.model]" :placeholder="item.placeholder"
          :clearable="item.clearable" :style="{ width: item.width || '100%' }" :type="item.input_type" />
        <el-select v-else-if="item.type === 'select'" v-model="addFrom[item.model]" :placeholder="item.placeholder"
          :clearable="item.clearable" :style="{ width: item.width || '100%' }">
          <el-option v-for="(opt, idx) in item.options" :key="idx" :label="opt.label" :value="opt.value" />
        </el-select>
        <el-tree-select v-else-if="item.type === 'tree-select'" @clear="handleClear(item.model, item.clearableValue)"
          v-model="addFrom[item.model]" :placeholder="item.placeholder" :check-strictly="item.checkStrictly"
          :clearable="item.clearable" :style="{ width: item.width || '100%' }" :data="item.data" :props="item.props" />
        <div v-else-if="item.type === 'date'" :style="{ width: item.width || '100%' }">
          <el-date-picker v-model="addFrom[item.model]" :clearable="item.clearable" :type="item.date_type"
            start-placeholder="开始时间" end-placeholder="结束时间" :format="item.format" :value-format="item.format" />
        </div>
        <el-time-picker v-else-if="item.type === 'time'" v-model="addFrom[item.model]" :placeholder="item.placeholder"
          :clearable="item.clearable" :style="{ width: item.width || '100%' }" :is-range="item.isRange" />
        <el-switch v-else-if="item.type === 'switch'" v-model="addFrom[item.model]" :active-text="item.activeText"
          :inactive-text="item.inactiveText" :active-value="item.activeValue" :inactive-value="item.inactiveValue" />
        <el-radio-group v-else-if="item.type === 'radio'" v-model="addFrom[item.model]"
          :style="{ width: item.width || '100%' }">
          <el-radio v-for="(opt, idx) in item.options" :key="idx" :label="opt.value">{{ opt.label }}</el-radio>
        </el-radio-group>
        <el-checkbox-group v-else-if="item.type === 'checkbox'" v-model="addFrom[item.model]"
          :style="{ width: item.width || '100%' }">
          <el-checkbox v-for="(opt, idx) in item.options" :key="idx" :label="opt.value">{{ opt.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="form-buttons">
        <el-button type="primary" @click="handleSubmit">
          提交
        </el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </template>
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
