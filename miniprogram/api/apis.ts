import { get, post } from "./request";

// 获取openID接口
export function requestOpenId(code: string) {
  return post(`/wx/auth?code=${code}`, {}, false)
}

// 获用户信息接口
export function requestUserInfo(userId: string) {
  return get(`/wx/users/${userId}`, {}, false)
}