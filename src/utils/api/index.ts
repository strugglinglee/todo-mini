import { Cloud, EnvironmentType } from 'laf-client-sdk'

const cloud = new Cloud({
  baseUrl: 'https://4dwue6.lafyun.com',
  getAccessToken: () => uni.getStorageSync('access_token') || '',
  environment: 'uniapp' as EnvironmentType,
})

const apiCloud: (key: string, params: Record<string, any>) => Promise<any> = async (
  key: string,
  params: Record<string, any>
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await cloud.invoke(key, params)
      // 处理接口未登录
      if (res.code === 'NO_AUTH') {
        resolve(res)
      } else {
        console.log(res)
        resolve(res)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export default apiCloud
