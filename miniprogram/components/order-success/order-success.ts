Page({
  toHomePage() {
    wx.switchTab({
      url: "/pages/home/home"
    })
  },

  toOrderPage() {
    wx.navigateTo({
      url: "/pages/profile/pages/order-center/order-center"
    })
  },
})