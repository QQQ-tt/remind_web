<script setup>
import ContainerAside from '@/view/container/container-aside.vue'
import ContainerHeader from '@/view/container/container-header.vue'
import ContainerMain from '@/view/container/container-main.vue'
import ContainerFooter from '@/view/container/container-footer.vue'

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <container-aside/>
      </el-aside>
      <el-container>
        <el-header>
          <container-header/>
        </el-header>
        <el-main>
          <container-main/>
        </el-main>
        <el-footer>
          <container-footer/>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>


<style scoped>

</style>
