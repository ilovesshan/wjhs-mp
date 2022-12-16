export function getlocationByAddress(address: string): Promise<{ lat: number, lng: number }> {
  return new Promise((resovle, reject) => {
    wx.request({
      url: `https://apis.map.qq.com/ws/geocoder/v1/?address=${address}&key=2KHBZ-FR3EP-J5KD3-LGNCZ-V7APO-OWBMS`,
      success: async (res) => {
        if (res.statusCode == 200 && res.data.status == 0) {
          resovle(res.data.result.location);
        }
      },
      fail(err) {
        wx.showToast({ title: "抱歉不能识别详细地址，您也可以更换地址或者联系联系客服", icon: "none" });
        reject(err);
      }
    });
  })
}