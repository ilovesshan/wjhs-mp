import Cache from "../utils/cache"

const BASE_URL: string = "https://32f38232.cpolar.cn";

type ALLOW_METHODS = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
type ALLOW_DATA = string | Map<String, any> | ArrayBuffer | any;


const get = (uri: string, query?: ALLOW_DATA): Promise<any> => {
  return baseRequest(uri, "GET", query);
}

const post = (uri: string, data?: ALLOW_DATA): Promise<any> => {
  return baseRequest(uri, "POST", data);
}

const put = (uri: string, data?: ALLOW_DATA): Promise<any> => {
  return baseRequest(uri, "PUT", data);
}

const delete_ = (uri: string, data?: ALLOW_DATA): Promise<any> => {
  return baseRequest(uri, "DELETE", data);
}


const baseRequest = (uri: string, method: ALLOW_METHODS, data?: ALLOW_DATA): Promise<any> => {
  return new Promise((resolve, reject) => {
    wx.showLoading({ title: "加载中..." })
    wx.request({
      url: `${BASE_URL}${uri}`,
      method,
      data,
      header: {
        "Authorization": Cache.get("token") ? "Bearer " + Cache.get("token") : "",
      },
      success: res => {
        if (res.statusCode == 200) {
          resolve(res)
        } else {
          // 请求失败情况(业务逻辑)
          if (res.statusCode == 401) {
            // 未授权
            wx.showToast({ title: "授权信息过期，请重新登录授权", icon: "none" })
          }
        }
      },
      fail: err => {
        console.log(err);
        reject(err);
      },
      complete: () => wx.hideLoading()
    })
  });
}


export {
  get, post, delete_, put
}