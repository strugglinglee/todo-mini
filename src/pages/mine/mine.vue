<template>
  <view class="mine">
    <view class="mine-top">
      <image v-if="userInfo.avatar" class="avatar" :src="userInfo.avatar"></image>
      <image v-else class="avatar" :src="defaultAvatar"></image>
      <view v-if="isLogin" class="info">
        <text class="info-top">{{ userInfo.username }}</text>
        <text class="info-bottom">{{ userInfo.sign || '' }}</text>
        <image class="edit" :src="imgPrefix + 'edit.png'" @click="toEdit"></image>
      </view>
      <view v-else>
        <button class="user-button" @click="toLogin">登录 / 注册</button>
      </view>
    </view>
    <view v-for="item in JUMP_LIST" :key="item.type" class="mine-list">
      <button :open-type="item.openType" class="mine-list-item" @click="handleCmd(item.type)">
        <view class="left">
          <van-icon :name="item.icon" />
          <text class="text">{{ item.text }}</text>
        </view>
        <view class="right">></view>
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import { getWxUserInfo } from '@/utils/api/user'
const userInfo = ref<Record<string, any>>({})
const imgPrefix = ref<any>(getApp().globalData?.imgPrefix)
const defaultAvatar = ref<any>(getApp().globalData?.defaultAvatar)
const isLogin = ref(false)
// 8cbb19 515151

const JUMP_LIST: any = [
  {
    text: '留言',
    icon: 'chat-o',
    type: 'contact',
  },
  {
    text: '分享',
    icon: 'share-o',
    type: 'share',
  },
  {
    text: '关于',
    icon: 'info-o',
    type: 'about',
  },
]

onShow(async () => {
  const res = await getWxUserInfo()
  isLogin.value = !res.error
  if (!isLogin.value) return
  userInfo.value = res.data || {}
})

const toLogin = () => {
  uni.navigateTo({ url: '/pages/login/wxLogin' })
}

const handleCmd = (type: string) => {}

const toEdit = () => {
  uni.navigateTo({ url: '/pages/mine/edit' })
}
</script>

<style lang="scss">
.mine {
  box-sizing: border-box;
  padding: 20rpx 30rpx;
  width: 100vw;
  height: 100vh;
  background: #f8f9fa;

  &-top {
    display: flex;
    align-items: center;
    margin-top: 10rpx;

    .avatar {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
    }

    .user-button {
      background-color: transparent;

      &::after {
        border: 0;
      }
    }
  }

  &-list {
    margin-top: 60rpx;
    background-color: #fff;
    border-radius: 20rpx;
    padding: 0 20rpx;

    &-item {
      display: flex;
      align-items: center;
      background-color: #fff;
      justify-content: space-between;
      padding: 20rpx;
      font-size: 28rpx;

      &::after {
        border: 0;
      }

      &:not(:last-child) {
        border-bottom: 2rpx dashed #eee;
      }

      .left {
        display: flex;
        align-items: center;

        .text {
          margin-left: 16rpx;
        }

        .icon {
          width: 50rpx;
          height: 50rpx;
        }
      }

      .right {
        color: #666;
      }
    }
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 120rpx;
    margin-left: 16rpx;
    position: relative;

    .edit {
      position: absolute;
      right: 48rpx;
      top: 38rpx;
      width: 48rpx;
      height: 48rpx;
    }

    &-top {
      width: 300rpx;
      white-space: nowrap;
      word-wrap: break-word;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 28rpx;
      font-weight: bold;
    }

    &-bottom {
      font-size: 24rpx;
      font-weight: #666;
    }
  }
}
</style>
