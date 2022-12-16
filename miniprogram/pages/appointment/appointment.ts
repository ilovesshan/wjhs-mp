import type { IAddress } from '../../interfaces/address';

Page({
  data: {
    defaultAddress: {} as IAddress,
  },

  chooseAddress() {
    wx.navigateTo({
      url: `/pages/profile/pages/address-management/address-management?id=${this.data.defaultAddress.id}`
    })
  }
})