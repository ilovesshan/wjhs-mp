import { get, post } from "./request";

// 获取openID接口
export function requestOpenId(code: string) {
  return post(`/wx/auth?code=${code}`, {}, false)
}

export function requestUserInfo(userId: string) {
  return get(`/wx/users/${userId}`, {}, false)
}