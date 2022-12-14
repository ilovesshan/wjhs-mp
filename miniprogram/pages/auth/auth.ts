import { requestOpenId, requestSystemDict, requestUserInfo } from "../../api/apis";
import Cache from "../../utils/cache";

Page({
  data: {
    isLoading: false,
  },
  onLoad() {
    this.tologin();
  },

  tologin() {
    this.setData({ isloading: true })
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
              Cache.set("userInfo", res.data);
            })

            // 获取数据字典
            requestSystemDict().then(res => {
              Cache.set("systemDict", res.data);
            })
            
            // 跳到首页
            wx.switchTab({
              url: "/pages/home/home",
            })
          }
        }, _ => {
          this.setData({ isloading: false })
        })
      },
    })
  }

})