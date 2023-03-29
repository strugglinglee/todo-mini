import apiCloud from '@/utils/api'

export const wxLogin = async (code: string) => {
  const res = await apiCloud('wx-mp-login', {
    code,
  })

  if (res.access_token) {
    // save token
    uni.setStorageSync('access_token', res.access_token)
    uni.showToast({ title: '登录成功' })
  }
}

export const getWxUserInfo = () => {
  return apiCloud('wx-mp-user-info', {})
}
