// 获取openID接口

import { post } from "./request";

export function requestOpenId(code: string) {
  return post(`/wx/auth?code=${code}`, {}, false)
}