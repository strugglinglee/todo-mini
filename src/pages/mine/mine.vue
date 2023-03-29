<template>
  <view class="mine">
    <view class="mine-top">
      <image v-if="userInfo.avatarUrl" class="avatar" :src="userInfo.avatarUrl"></image>
      <image v-else class="avatar" :src="imgPrefix + 'avatar_female.png'"></image>
      <view v-if="isLogin" class="info">
        <text class="info-top">{{ userInfo.nickName }}</text>
        <text class="info-bottom"
          >{{ userInfo.province }}
          <text v-if="userInfo.city" class="city">,{{ userInfo.city }}</text>
        </text>
      </view>
      <view v-else>
        <button class="user-button" open-type="getUserInfo" @click="onGotUserInfo">登录 / 注册</button>
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
const imgPrefix = reactive<any>(getApp().globalData?.imgPrefix)
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
})

const onGotUserInfo = (e: any) => {}

const handleCmd = (type: string) => {}
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
      width: 120rpx;
      height: 120rpx;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 120rpx;
    margin-left: 16rpx;

    &-top {
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
