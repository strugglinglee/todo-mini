<template>
  <view class="edit">
    <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
      <image class="avatar" :src="userInfo.avatar || defaultAvatar"></image>
    </button>
    <van-cell-group>
      <van-field
        ref="refTest"
        :value="userInfo.username"
        placeholder="请输入昵称"
        required
        clearable
        label="昵称"
        type="nickname"
        @blur="handleNameChange"
      />
      <van-field
        :value="userInfo.sign"
        placeholder="请输入个性签名"
        clearable
        label="个性签名"
        @blur="handleSignChange"
      />
    </van-cell-group>
    <view class="edit-bottom">
      <van-button type="primary" block :loading="confirmLoading" loading-text="提交中..." @click="handleConfirm">
        确定修改
      </van-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeMount, reactive } from 'vue'
import { updateWxUserInfo, getWxUserInfo } from '@/utils/api/user'
// const imgPrefix = ref<string>(getApp().globalData?.imgPrefix)
const defaultAvatar = ref<string>(getApp().globalData?.defaultAvatar)
const userInfo = ref<Record<string, any>>({})
const confirmLoading = ref(false)
const refTest = ref(null)

onMounted(async () => {
  const res = await getWxUserInfo()
  userInfo.value = res.data || {}
})

const handleNameChange = (e: any) => {
  userInfo.value.username = e.detail.value || ''
}

const handleSignChange = (e: any) => {
  userInfo.value.sign = e.detail.value || ''
}

const handleConfirm = async () => {
  console.log(userInfo.value, 'user')
  if (!userInfo.value.username.trim()) {
    uni.showToast({ title: '请填写昵称', icon: 'none' })
    return
  }
  try {
    confirmLoading.value = true
    const res = await updateWxUserInfo({
      username: userInfo.value.username,
      sign: userInfo.value.sign,
      avatar: userInfo.value.avatar,
    })
    if (res.data) {
      uni.showToast({ title: '修改成功' })
      uni.navigateBack()
      return
    }
    uni.showToast({ title: '操作失败，请稍后再试', icon: 'none' })
  } finally {
    confirmLoading.value = false
  }
}

const onChooseAvatar = (e: any) => {
  console.log(e)
  const { avatarUrl } = e.detail
  userInfo.value.avatar = avatarUrl
}
</script>

<style lang="scss" scoped>
.edit {
  padding: 32rpx;

  .avatar-wrapper {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 100rpx;
    padding: 0 !important;

    .avatar {
      width: 200rpx;
      height: 200rpx;
    }
  }

  &-bottom {
    position: fixed;
    width: calc(100vw - 64rpx);
    left: 32rpx;
    bottom: calc(30rpx + env(safe-area-inset-bottom));
  }
}
</style>
