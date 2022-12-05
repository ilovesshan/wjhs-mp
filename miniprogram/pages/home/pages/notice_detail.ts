interface INoticeDetail {
  title: string,
  subTitle: string,
  detail: string,
}

Page({
  data: {
    title: "",
    subTitle: "",
    detail: "",
  } as INoticeDetail,

  onLoad(options: any) {
    const { title, subTitle, detail } = options;
    wx.setNavigationBarTitle({ title });
    this.setData({
      title,
      subTitle,
      detail,
    })
  }
})