import { Cloud, EnvironmentType } from 'laf-client-sdk'

const cloud = new Cloud({
  baseUrl: 'https://4dwue6.lafyun.com',
  getAccessToken: () => uni.getStorageSync('access_token') || '',
  environment: 'uniapp' as EnvironmentType,
})

export default cloud
