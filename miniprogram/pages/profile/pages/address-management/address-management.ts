import type { IAddress } from '../../../../interfaces/address';
import { deleteAddressById, requesUserAddressList } from "../../../../api/apis"

Page({
  data: {
    currentSelectAddressId: "",
    addressList: [] as Array<IAddress>,
    isChooseAddress: false,
  },

  onShow() {
    this.getaddressList();
  },

  onLoad(params: { id: string }) {
    if (params.id) {
      this.setData({
        currentSelectAddressId: params.id,
      })
    }
  },

  // 获取地址列表
  async getaddressList() {
    const result = await requesUserAddressList();
    this.setData({
      addressList: result.data,
    })
  },

  // 新增地址
  addAddress() {
    wx.navigateTo({
      url: "/pages/profile/pages/add-or-update-address/add-or-update-address"
    })
  },

  // 编辑地址
  editAddress(e: WechatMiniprogram.BaseEvent) {
    const id = e.target.dataset.id;
    wx.navigateTo({
      url: `/pages/profile/pages/add-or-update-address/add-or-update-address?id=${id}`
    });
  },

  // 删除地址
  async deleteAddress(e: WechatMiniprogram.BaseEvent) {
    const id = e.target.dataset.id;
    const result = await deleteAddressById(id);
    if (result.code == 200) {
      wx.showToast({ title: result.message, icon: "none" });
      this.getaddressList();
    } else {
      wx.showToast({ title: result.message, icon: "none" })
    }
  },


  // 选择当前地址
  async useAddresss(e: WechatMiniprogram.BaseEvent) {
    const selectAddress = e.target.dataset.item;
    this.setData({
      currentSelectAddressId: selectAddress.id,
    });

    const pages = getCurrentPages();
    const beforePage = pages[pages.length - 2]
    beforePage.setData({
      //会直接更新预约回收界面数据
      defaultAddress: selectAddress,
    })
    wx.navigateBack();
  }
})