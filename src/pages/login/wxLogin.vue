<template>
  <view class="login">
    <van-button class="login_btn" type="primary" @click="login">微信账号一键登录</van-button>
  </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, onBeforeMount } from 'vue'
import { wxLogin, getWxUserInfo } from '@/utils/api/user'

onMounted(() => {})

const login = async () => {
  getWxUserInfo()
  // uni.login({
  //   success: (res) => {
  //     if (res.code) {
  //       wxLogin(res.code)
  //     } else {
  //       console.log('登录失败！' + res.errMsg)
  //     }
  //   },
  // })
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
