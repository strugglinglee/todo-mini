<template>
  <view class="login">
    <van-cell-group>
      <van-field
        :value="form.phone"
        placeholder="请输入手机号"
        required
        clearable
        label="手机号"
        @change="handleChange"
      />
      <van-field :value="form.password" center clearable label="密码" placeholder="请输入密码"> </van-field>
    </van-cell-group>
  </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, onBeforeMount } from 'vue'
import cloud from '@/utils/api'
import { checkMobile } from '@/utils/index'

let timer: any = null

const form = reactive<SMS_LOGIN_FORM>({
  phone: '',
  password: '',
})

onMounted(() => {
  console.log(cloud, 'hi')
})

onBeforeMount(() => {
  timer && clearInterval(timer)
})

const handleChange = (e: any) => {
  form.phone = e.detail
}

const checkPhoneNumber = () => {
  if (!form.phone) {
    uni.showToast({ title: '请填写手机号', icon: 'none' })
    return false
  }
  if (!checkMobile(form.phone)) {
    uni.showToast({ title: '请填写正确手机号', icon: 'none' })
    return false
  }
  return true
}
</script>

<style lang="scss">
.login {
  padding: 32rpx;
}
</style>
