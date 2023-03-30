<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<script lang="ts">
export default {
  globalData: {
    imgPrefix: 'https://oss.lafyun.com/4dwue6-data/wx/',
    defaultAvatar: 'https://oss.lafyun.com/4dwue6-data/wx/avatar.png',
  },
}
</script>
<style></style>
