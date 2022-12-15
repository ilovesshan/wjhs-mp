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

  // 用户详情
  toUserDetailInfoPage() {
    wx.navigateTo({
      url: "/pages/profile/pages/user-detail-info/user-detail-info"
    })
  },
  // 账户管理
  toAccountManagementPage() { },

  // 地址管理
  toAddressManagementPage() { },

  // 兑换中心
  toExchangeCenterPage() { },

  // 订单中心
  toOrderCenterPage() { },

  // 联系客服
  toConcatServicePage() { },
  
  // 意见反馈
  toSuggestFeedbackPage() { },
})
