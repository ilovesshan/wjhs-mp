import { IUserInfo } from "../../interfaces/user";
import { BASE_URL } from "../../api/request";
import Cache from "../../utils/cache";

Page({
  data: {
    BASE_URL: "",
    userInfo: {} as IUserInfo,
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
  toAccountManagementPage() {
    wx.navigateTo({
      url: "/pages/profile/pages/account-management/account-management"
    });
  },


  // 推广应用
  shareWxMp() {
    wx.showToast({ title: "功能还未上线，敬请期待！", icon: "none" });
  },


  // 地址管理
  toAddressManagementPage() {
    wx.navigateTo({
      url: "/pages/profile/pages/address-management/address-management"
    })
  },


  // 兑换中心
  toExchangeCenterPage() {
    wx.showToast({ title: "功能还未上线，敬请期待！", icon: "none" });
  },


  // 订单中心
  toOrderCenterPage() {
    wx.navigateTo({
      url: "/pages/profile/pages/order-center/order-center"
    })
  },


  // 联系客服
  toConcatServicePage() {
    wx.showToast({ title: "功能还未上线，敬请期待！", icon: "none" });
  },


  // 意见反馈
  toSuggestFeedbackPage() {
    wx.navigateTo({
      url: "/pages/profile/pages/feedback-record/feedback-record"
    });
  },
})
