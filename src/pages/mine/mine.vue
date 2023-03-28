<template>
  <view class="content"> {{ title }} </view>
  <van-button type="primary">主要按钮</van-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Hello')
</script>

<style lang="scss">
.content {
  background-color: antiquewhite;
}
</style>
