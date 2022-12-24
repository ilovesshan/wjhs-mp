import { areaList } from '@vant/area-data';
import { getlocationByAddress } from '../../../../api/map';
import { insertAddress, requesUserAddressById, updateAddress } from '../../../../api/apis';
import { parseAddress } from '../../../../utils/parseAddress';
import type { IAddress } from '../../../../interfaces/address';

Page({
  data: {
    areaList: areaList,
    addressData: {} as IAddress,
  },
  async onLoad(params: { id: string }) {
    if (params.id) {
      // 请求最新的数据
      const result = await requesUserAddressById(params.id);
      this.setData({
        addressData: result.data,
      })
    }
  },

  provinceAndCityChoose() {
    this.setData({
      showCityPicker: true,
    })
  },

  onCityPickerConfirm(data:  WechatMiniprogram.TouchEvent) {
    const [province, city, area] = data.detail.values;
    this.setData({
      showCityPicker: false,
      ['addressData.province']: province.name,
      ['addressData.city']: city.name,
      ['addressData.area']: area.name,
    })
  },


  onCityPickerCancel() {
    this.setData({
      showCityPicker: false,
    })
  },

  defaultAddressBindchange(e: WechatMiniprogram.TouchEvent) {
    this.setData({
      ['addressData.isDefault']: !e.detail.value ? '19' : '18'
    })
  },

  binduserName(e: WechatMiniprogram.TouchEvent) {
    this.setData({
      ['addressData.userName']: e.detail.value
    })
  },

  bindPhone(e: WechatMiniprogram.TouchEvent) {
    this.setData({
      ['addressData.phone']: e.detail.value
    })
  },

  bindDetailAddress(e: WechatMiniprogram.TouchEvent) {
    this.setData({
      ['addressData.detailAddress']: e.detail.value
    })
  },

  async saveAddressInfo() {
    const { province, city, area, detailAddress } = this.data.addressData;
    const address = province + city + area + detailAddress;

    if(!this.data.addressData.userName){
      wx.showToast({ title: "请输入姓名", icon: "none" })
      return;
    }
    
    if(!this.data.addressData.phone){
      wx.showToast({ title: "请输入手机号", icon: "none" })
      return;
    }

    if(!this.data.addressData.province){
      wx.showToast({ title: "请选择地址", icon: "none" })
      return;
    }

    if(!this.data.addressData.latitude || !this.data.addressData.longitude){
      // 根据address获取经纬度
      const result = await getlocationByAddress(address);
      this.setData({
        ['addressData.latitude']: result.lat,
        ['addressData.longitude']: result.lng,
      });
    }

    let result = null;
    if (this.data.addressData.id) {
      // 更新
      result = await updateAddress(this.data.addressData);
    } else {
      result = await insertAddress(this.data.addressData);
    }
    if (result.code == 200) {
      wx.showToast({ title: result.message, icon: "none" })
    } else {
      wx.showToast({ title: result.message, icon: "none" })
    }
  },

  openMap() {
    wx.getLocation({
      isHighAccuracy: true,
      type: 'gcj02',
      success: (res: { latitude: number, longitude: number }) => {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.chooseLocation({
          latitude,
          longitude,
          success: (res: { address: string, name: string }) => {
            const [province, city, area, detailAddress] = parseAddress(res.address, res.name);
            this.setData({
              ['addressData.province']: province,
              ['addressData.city']: city,
              ['addressData.area']: area,
              ['addressData.detailAddress']: detailAddress,
              ['addressData.latitude']: latitude,
              ['addressData.longitude']: longitude,
            })
          },
          fail(err) {
            console.log(err);
          }
        })
      },
      fail(err) {
        console.log(err);
      },
    })
  }
});
