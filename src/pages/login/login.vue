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

      <van-field :value="form.code" center clearable label="短信验证码" placeholder="请输入短信验证码" use-button-slot>
        <van-button v-if="!smsInfo.isSended" slot="button" size="small" type="primary" @click="sendSms">
          发送验证码
        </van-button>
        <text v-else slot="button" size="small" type="primary"> {{ smsInfo.countdownSecond }}s </text>
      </van-field>
    </van-cell-group>
  </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, onBeforeMount } from 'vue'
import apiCloud from '@/utils/api'
import { checkMobile } from '@/utils/index'

let timer: any = null

const form = reactive<SMS_LOGIN_FORM>({
  phone: '',
  code: '',
})
const smsInfo = reactive<Record<string, any>>({
  // 是否发送
  isSended: false,
  // 倒数秒
  countdownSecond: 60,
})

onMounted(() => {
  console.log(apiCloud, 'hi')
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

const sendSms = async () => {
  if (!checkPhoneNumber()) return
  const intervalFn = () => {
    if (!smsInfo.countdownSecond) {
      clearInterval(timer)
      smsInfo.isSended = false
      smsInfo.countdownSecond = 60
      return
    }
    smsInfo.countdownSecond--
  }
  const res = await apiCloud('send-login-sms', {
    phone: form.phone,
  })
  console.log(res)
  smsInfo.isSended = true
  intervalFn()
  timer = setInterval(intervalFn, 1000)
}
</script>

<style lang="scss">
.login {
  padding: 32rpx;
}
</style>
