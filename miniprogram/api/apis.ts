import { get, post } from "./request";

// 获取openID接口
export function requestOpenId(code: string) {
  return post(`/wx/auth?code=${code}`, {}, false)
}

// 获用户信息接口
export function requestUserInfo(userId: string) {
  return get(`/wx/users/${userId}`, {}, false)
}

// 获取数据字典接口
export function requestSystemDict() {
  return get(`/systemDict`, {}, false)
}