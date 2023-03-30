import apiCloud from '@/utils/api'

export const wxLogin = async (code: string) => {
  return apiCloud('wx-mp-login', {
    code,
  })
}

export const getWxUserInfo = () => {
  return apiCloud('wx-mp-user-info', {})
}

export const updateWxUserInfo = (info: Record<string, any>) => {
  return apiCloud('wx-mp-update-user-info', info)
}
