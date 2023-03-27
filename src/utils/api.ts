// user.ts

import { Cloud, EnvironmentType } from 'laf-client-sdk'

const cloud = new Cloud({
  baseUrl: 'https://ybnvrp.lafyun.com',
  getAccessToken: () => uni.getStorageSync('access_token') || '',
  environment: 'uniapp' as EnvironmentType,
})

// regiser function
export async function register(username: string, password: string) {
  const res = await cloud.invoke('app-login-password', {
    username: username,
    password: password,
  })
  return res
}

// login function
export async function login(username: string, password: string) {
  const res = await cloud.invoke('login', {
    username: username,
    password: password,
  })

  if (res.access_token) {
    uni.setStorageSync('access_token', res.access_token)
  }
  return res
}
