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

// 获取轮播图数据接口
export function requestSwiper() {
  return get(`/swiper?type=31`, {}, false)
}

// 获取通知公告接口
export function requestNotice() {
  return get(`/notice?type=31`, {}, false)
}

//更新用户信息接口
export function requesUpdateUser(data: any) {
  return post(`/wx/users`, data, true)
}


// 获取回收商品
export function requesRecycleGoods() {
  return get(`/recycleGoods/all`)
}