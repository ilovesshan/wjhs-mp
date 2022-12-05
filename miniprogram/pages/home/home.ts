import { requestNotice, requestSwiper, requestSystemDict } from "../../api/apis";

interface IAttachment {
  id: string,
  url: string,
  createByUserId: string,
  createByUserName: string,
  createByUserType: string,
  createTime: string,
}

interface ISwiper {
  id: string,
  type: string,
  attachmentId: string,
  title: string,
  subTitle: string,
  detail: string,
  link: string,
  createTime: string
  attachment: IAttachment
}

interface INotice {
  id: string,
  type: string,
  title: string,
  subTitle: string,
  detail: string,
  link: string,
  createTime: string,
}

interface IHomeData {
  swiperList: Array<ISwiper>,
  noticeList: Array<INotice>,
}

Page({
  data: {
    swiperList: [],
    noticeList: [],
  } as IHomeData,

  onLoad() {
    this.getSwiper();
    this.getNotice();
  },

  getSwiper() {
    requestSwiper().then(res => {
      this.setData({
        swiperList: res.data,
      })
    });
  },

  getNotice() {
    requestNotice().then(res => {
      this.setData({
        noticeList: res.data,
      })
    });
  },


  getData() {
    requestSystemDict().then(res => {
      console.log(res);
    })
  }
})