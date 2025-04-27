<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  listPage: {
    type: Function,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
})

const small = ref(false)
const background = ref(true)
const disabled = ref(false)
const pageNum = ref(1)
const pageSize = ref(10)

// 边界校验（最大100条/页）
const setPageSize = (val) => {
  pageSize.value = Math.min(val, 100)
}

const triggerListPage = () => {
  props.listPage(pageNum.value, pageSize.value)
}

const handleSizeChange = (val) => {
  setPageSize(val)
  pageNum.value = 1 // 切换每页条数重置页码
  triggerListPage()
}

const handleCurrentChange = (val) => {
  pageNum.value = val
  triggerListPage()
}

// 自动监听分页参数变化
watchEffect(() => {
  if (pageNum.value * pageSize.value - props.total > pageSize.value) {
    pageNum.value = Math.max(1, Math.floor(props.total / pageSize.value))
  }
})
</script>

<template>
  <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
    :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
    :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" class="custom-pagination" />
</template>

<style scoped lang="scss">
.custom-pagination {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  :deep(.btn-prev),
  :deep(.btn-next) {
    padding: 0 12px;
    border-radius: 4px;
  }

  .is-loading {
    margin-left: 12px;
    animation: rotating 2s linear infinite;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;

    :deep(.el-pagination__total) {
      margin-bottom: 8px;
    }
  }
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
