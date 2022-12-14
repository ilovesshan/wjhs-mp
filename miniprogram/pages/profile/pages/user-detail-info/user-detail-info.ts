import { areaList } from '@vant/area-data';
import { requesUpdateUser, requestUserInfo } from '../../../../api/apis';
import { BASE_URL } from "../../../../api/request";
import Cache from "../../../../utils/cache";

Page({
  data: {
    areaList,
    genderList: { province_list: { 20: '男', 21: '女' } },
    showCityPicker: false,
    showGenderPicker: false,
    userInfo: {},
    avatarList: [],
  },
  onLoad() {
    this.setData({
      avatarList: Cache.get("userInfo").avatarUrl ? [{ url: (BASE_URL + Cache.get("userInfo").avatarUrl) }] : [],
      BASE_URL: BASE_URL,
      userInfo: Cache.get("userInfo"),
    })
  },

  provinceAndCityChoose() {
    this.setData({
      showCityPicker: true,
    })
  },

  genderChoose() {
    this.setData({
      showGenderPicker: true,
    })
  },

  onCityPickerConfirm(data: any) {
    const [province, city] = data.detail.values;
    this.setData({
      showCityPicker: false,
      userInfo: {
        ...this.data.userInfo,
        province: province.name,
        city: city.name,
      }
    })
  },

  onGenderPickerConfirm(data: any) {
    const [gender] = data.detail.values;
    this.setData({
      showGenderPicker: false,
      userInfo: {
        ...this.data.userInfo,
        gender: gender.code,
      }
    })
  },

  onCityPickerCancel() {
    this.setData({
      showCityPicker: false,
    })
  },

  onGenderPickerCancel() {
    this.setData({
      showGenderPicker: false,
    })
  },

  afterRead(event: any) {
    const { file } = event.detail;
    wx.uploadFile({
      url: BASE_URL + '/attachments',
      filePath: file.url,
      name: 'file',
      header: {
        "Authorization": "Openid " + Cache.get("openId"),
      },
      success: (res) => {
        const url = JSON.parse(res.data).data.url;
        this.setData({
          avatarList: [
            {
              url: BASE_URL + url,
            },
          ],
          userInfo: {
            ...this.data.userInfo,
            avatarUrl: url,
          }
        });
      },
      fail: (err) => {
        console.log(err);
        wx.showToast({ title: "上传失败,请稍后再试", icon: "none" })
      }
    });
  },

  clearAvatar() {
    this.setData({
      avatarList: [],
      userInfo: {
        ...this.data.userInfo,
        avatarUrl: null,
      }
    });
  },

  bindNickName(e: any) {
    this.setData({
      ['userInfo.nickName']: e.detail.value
    })
  },

  saveUserInfo() {
    const submitData = {
      ...this.data.userInfo,
      country: "中国",
    }
    requesUpdateUser(submitData).then(res => {
      wx.showToast({ title: res.message, icon: "none" })
      // 更新一次全局用户信息
      requestUserInfo(submitData.id).then(res => {
        Cache.set("userInfo", res.data);
      })
    })
  }
});
