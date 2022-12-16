import { areaList } from '@vant/area-data';
import { getlocationByAddress } from '../../../../api/map';
import { insertAddress, requesUserAddressById, updateAddress } from '../../../../api/apis';
import { parseAddress } from '../../../../utils/parseAddress';

Page({
  data: {
    areaList: areaList,
    addressData: {} as {
      id?: string, province: string, city: string, area: string, detailAddress: string,
    },
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

  onCityPickerConfirm(data: any) {
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

  defaultAddressBindchange(e: any) {
    this.setData({
      ['addressData.isDefault']: !e.detail.value ? '19' : '18'
    })
  },

  binduserName(e: any) {
    this.setData({
      ['addressData.userName']: e.detail.value
    })
  },

  bindPhone(e: any) {
    this.setData({
      ['addressData.phone']: e.detail.value
    })
  },

  bindDetailAddress(e: any) {
    this.setData({
      ['addressData.detailAddress']: e.detail.value
    })
  },

  async saveAddressInfo() {
    const { province, city, area, detailAddress } = this.data.addressData;
    const address = province + city + area + detailAddress;
    getlocationByAddress(address).then(async (res) => {
      this.setData({
        ['addressData.latitude']: res.lat,
        ['addressData.longitude']: res.lng,
      });
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
    }).catch(_ => { })
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
