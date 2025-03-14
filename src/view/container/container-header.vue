<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
// 动态生成面包屑数组
const breadcrumbs = computed(() => {
  // 当前路径（如：/user/profile/edit）
  const pathArray = route.path.split('/').filter((part) => part) // 过滤空字符串
  // 生成面包屑项
  return pathArray.reduce((acc, part) => {
    // 累计路径（如：/user, /user/profile）
    const currentPath = `/${acc.length ? acc[acc.length - 1].path.split('/').slice(1).join('/') + '/' + part : part}`
    // 添加到数组
    acc.push({
      path: currentPath,
      name: name || part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
    })
    return acc
  }, [])
})
</script>

<template>
  <el-row>
    <el-col :span="18">
      <el-breadcrumb separator="/">
        <!-- 动态生成的面包屑项 -->
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbs"
          :key="index"
          :to="item.path"
          :replace="index === breadcrumbs.length - 1"
        >
          <!-- 面包屑项内容 -->
          <span v-if="index === breadcrumbs.length - 1">{{ item.name }}</span>
          <router-link v-else :to="item.path">{{ item.name }}</router-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="6">
      哈哈哈
    </el-col>
  </el-row>
</template>

<style scoped>
.el-breadcrumb {
  margin: 20px;
}
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}
</style>
