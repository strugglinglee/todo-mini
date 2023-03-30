<template>
  <view class="login">
    <van-button class="login_btn" type="primary" :loading="loginLoading" loading-text="登录中..." @click="login"
      >微信账号一键登录</van-button
    >
  </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, onBeforeMount, ref } from 'vue'
import { wxLogin } from '@/utils/api/user'

const loginLoading = ref(false)

onMounted(() => {})

const login = () => {
  loginLoading.value = true
  uni.login({
    success: async (res) => {
      if (res.code) {
        const loginRes = await wxLogin(res.code)
        if (loginRes.access_token) {
          // save token
          uni.setStorageSync('access_token', loginRes.access_token)
          uni.showToast({ title: '登录成功' })
          uni.navigateBack()
          loginLoading.value = false
          return
        }

        uni.showToast({ title: '登录失败', icon: 'none' })
        loginLoading.value = false
      }
    },
    fail: () => {
      loginLoading.value = false
    },
  })
}
</script>

<style lang="scss">
.login {
  padding: 32rpx;

  &_btn {
    margin: auto;
  }
}
</style>
