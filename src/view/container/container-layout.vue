<script setup>
import ContainerAside from '@/view/container/container-aside.vue'
import ContainerHeader from '@/view/container/container-header.vue'
import ContainerMain from '@/view/container/container-main.vue'
import ContainerFooter from '@/view/container/container-footer.vue'

</script>

<template>
  <div class="common-layout">
    <el-container style="height: 100vh;">
      <el-aside width="200px">
        <container-aside />
      </el-aside>
      <el-container>
        <el-header>
          <container-header />
        </el-header>
        <!-- 添加滚动区域 -->
        <el-main style="padding: 5px; flex: 1; overflow-y: auto;">
          <container-main />
        </el-main>
        <!-- 底部始终固定 -->
        <el-footer style="flex-shrink: 0; height: 50px;">
          <container-footer />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>