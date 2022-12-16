import { get, post, put, delete_ } from "./request";

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


// 根据ID获取地址
export function requesUserAddressById(id: string) {
  return get(`/wx/address/${id}`)
}

// 获取地址列表
export function requesUserAddressList() {
  return get(`/wx/address`)
}

// 新增地址
export function insertAddress(data: any) {
  return post(`/wx/address`, data)
}

//  更新地址
export function updateAddress(data: any) {
  return put(`/wx/address`, data)
}

// 根据ID删除地址
export function deleteAddressById(id: string) {
  return delete_(`/wx/address/${id}`)
}