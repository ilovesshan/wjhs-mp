import Cache from "../utils/cache"

// const BASE_URL: string = "http://114.55.32.234:8127";
const BASE_URL: string = "https://76d427ba.r2.vip.cpolar.cn";

type ALLOW_METHODS = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
type ALLOW_DATA = string | Map<String, any> | ArrayBuffer | any;


const get = (uri: string, query?: ALLOW_DATA, loading: boolean = true): Promise<any> => {
  return baseRequest(uri, "GET", query, loading);
}

const post = (uri: string, data?: ALLOW_DATA, loading: boolean = true): Promise<any> => {
  return baseRequest(uri, "POST", data, loading);
}

const put = (uri: string, data?: ALLOW_DATA, loading: boolean = true): Promise<any> => {
  return baseRequest(uri, "PUT", data, loading);
}

const delete_ = (uri: string, data?: ALLOW_DATA, loading: boolean = true): Promise<any> => {
  return baseRequest(uri, "DELETE", data, loading);
}


const baseRequest = (uri: string, method: ALLOW_METHODS, data?: ALLOW_DATA, loading: boolean = true): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (loading) {
      wx.showLoading({ title: "加载中..." })
    }
    wx.request({
      url: `${BASE_URL}${uri}`,
      method,
      data,
      header: {
        "Authorization": "Openid " + Cache.get("openId"),
      },
      success: res => {
        if (res.statusCode == 200) {
          resolve(res.data)
        } else {
          // 请求失败情况(业务逻辑)
          if (res.statusCode == 401) {
            // 未授权
            if ((res.data as any).message != null) {
              wx.showToast({ title: (res.data as any).message, icon: "none" });
            } else {
              wx.showToast({ title: "授权信息过期，请重新登录授权", icon: "none" })
            }
            wx.navigateTo({
              url: "/pages/auth/auth"
            })
          } else {
            wx.showToast({ title: "服务器繁忙" + ((res.data as any).error || (res.data as any)), icon: "none" })
          }
          reject(res);
        }
      },
      fail: err => {
        wx.showToast({ title: "服务器繁忙，请稍后再试", icon: "none" })
        console.log(err);
        reject(err);
      },
      complete: () => {
        if (loading) {
          wx.hideLoading()
        }
      }
    })
  });
}


export {
  get, post, delete_, put, BASE_URL
}