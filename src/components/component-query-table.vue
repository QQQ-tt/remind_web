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

const getFilteredActions = (actions, row) => {
  return actions.filter(action => action.visible ? action.visible(row) : true);
}
</script>

<template>
  <el-table :data="tableData" style="width: 100%" height="468" row-key="id" border stripe>
    <el-table-column v-for="(col, index) in columns" :key="index" :prop="col.prop" :label="col.label" :width="col.width"
      :min-width="col.minWidth" :show-overflow-tooltip="col.showOverflowTooltip" :sortable="col.sortable">
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
    <el-table-column v-if="actions.length" label="操作" width="220">
      <template #default="scope">
        <el-button v-for="(action, index) in getFilteredActions(actions, scope.row)" :key="index"
          :type="action.type || 'primary'" size="small" @click="action.handler(scope.$index, scope.row)">
          {{ action.label }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped></style>
