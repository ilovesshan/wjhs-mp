import { requestOpenId } from "../../api/apis";
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