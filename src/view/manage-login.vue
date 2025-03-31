<script setup>
import { Lock, User } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { loginUser } from '@/api/login-api.js'
import { useTokenStore } from '@/store/index'
import router from '@/router/router'

// 控制注册与登录表单的显示，默认显示注册
const fromRegister = ref()
const loading = ref(false)
const registerData = ref({
  account: '',
  password: '',
})

const isRemember = ref(false) // 新增：控制"记住我"状态

// 定义背景图片数组
const backgroundImages = [
  new URL('@/asset/7410e50e0b00bdf12.jpg', import.meta.url).href,
  new URL('@/asset/2d18b96e458cb315.jpg', import.meta.url).href,
]
const randomBackground = ref(backgroundImages[Math.floor(Math.random() * backgroundImages.length)])

// 登录
const login = async () => {
  loading.value = true
  await loginUser(registerData.value)
    .then((result) => {
      const data = result.data
      const tokenStore = useTokenStore()
      if (data.code === 200) {
        const user = data.data
        tokenStore.setToken(user.token, user.id, user.name, isRemember.value)
        router.push({ name: 'dashboard' })
        registerData.value = {}
      } else {
        loading.value = false
      }
    })
    .catch(() => {
      loading.value = false
    })
  loading.value = false
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"
      :style="{ backgroundImage: `url(${randomBackground})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 登录表单 -->
      <el-form ref="fromRegister" size="large" autocomplete="off" :model="registerData">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="userId">
          <el-input :prefix-icon="User" placeholder="请输入账户或手机号" v-model="registerData.account"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
            v-model="registerData.password"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox v-model="isRemember">记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button @click="login()" class="button" type="primary" :loading="loading" auto-insert-space>登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <el-row justify="center" style="margin-top: 20px">
    <el-col :span="24" style="text-align: center">
      <el-link href="https://beian.miit.gov.cn/" target="_blank" type="info" :underline="false">
        黑ICP备2025035968号
      </el-link>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.el-link--info {
  font-size: 12px;
  color: #999;

  &:hover {
    color: #666;
  }
}

/* 样式 */
.login-page {
  height: 85vh;
  margin-top: 5vh;
  background-color: #fff;

  .bg {
    background-size: cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
