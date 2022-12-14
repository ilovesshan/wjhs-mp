import { BASE_URL } from "../../api/request";
import Cache from "../../utils/cache";

Page({
  data: {
    BASE_URL: "",
    userInfo: {},
  },
  onShow() {
    this.setData({
      BASE_URL: BASE_URL,
      userInfo: Cache.get("userInfo"),
    })
  },

  toUserDetailInfoPage() {
    wx.navigateTo({
      url: "/pages/profile/pages/user-detail-info/user-detail-info"
    })
  }
})
