Page({
  data: {
    defaultAddress: {},
  },

  chooseAddress() {
    wx.navigateTo({
      url: `/pages/profile/pages/address-management/address-management?id=${this.data.defaultAddress.id}`
    })
  }
})