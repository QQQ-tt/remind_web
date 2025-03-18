<script setup>
defineProps({
  tableData: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  actions: {
    type: Array,
    default: () => [],
  }
})
</script>

<template>
  <el-table :data="tableData" style="width: 100%" border stripe>
    <el-table-column
      v-for="(col, index) in columns"
      :key="index"
      :prop="col.prop"
      :label="col.label"
      :width="col.width"
      :show-overflow-tooltip="col.showOverflowTooltip"
    >
      <!-- 判断是否有插槽 -->
      <template v-if="$slots[col.prop]" #default="scope">
        <slot :name="col.prop" v-bind="scope" />
      </template>

      <!-- 使用 formatter 渲染 -->
      <template v-else-if="col.formatter" #default="scope">
        {{ col.formatter(scope.row[col.prop], scope.row) }}
      </template>

      <!-- 默认展示数据 -->
      <template v-else #default="scope">
        {{ scope.row[col.prop] }}
      </template>
    </el-table-column>

    <!-- 操作列 -->
    <el-table-column v-if="actions.length" label="操作" width="200">
      <template #default="scope">
        <el-button
          v-for="(action, index) in actions"
          :key="index"
          :type="action.type || 'primary'"
          size="small"
          @click="action.handler(scope.$index, scope.row)"
        >
          {{ action.label }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>
