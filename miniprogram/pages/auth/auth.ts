import { requestOpenId, requestUserInfo } from "../../api/apis";
import Cache from "../../utils/cache";

Page({
  onLoad() {
    // 登录
    wx.login({
      success: response => {
        console.log(response.code)
        requestOpenId(response.code).then(res => {
          if (res.code === 200) {
            Cache.set("userId", res.data.id);
            Cache.set("openId", res.data.openId);

            // 获取用户信息
            requestUserInfo(res.data.id).then(res => {
              console.log(res);
            })

            // 跳到首页
            wx.switchTab({
              url: "/pages/home/home",
            })
          }
        })
      },
    })
  }
})