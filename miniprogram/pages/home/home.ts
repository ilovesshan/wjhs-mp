import { requestNotice, requestSwiper } from "../../api/apis";
import { BASE_URL } from "../../api/request";

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
      const list = res.data.map((item: ISwiper) => {
        item.attachment.url = BASE_URL + item.attachment.url;
        return item;
      })
      this.setData({
        swiperList: list,
      })
    });
  },

  getNotice() {
    requestNotice().then(res => {
      this.setData({
        noticeList: res.data.slice(0, 2),
      })
    });
  },

  toWebview(e: any) {
    const index = e.target.dataset.index;
    const pageTitle = this.data.swiperList[index].title;
    const pagePath = this.data.swiperList[index].link;
    wx.navigateTo({
      url: `/components/webView/webView?pageTitle=${pageTitle}&pagePath=${pagePath}`,
    });
  },


  toNoticeDetail(e: any) {
    const index = e.target.dataset.index;
    const { noticeList } = this.data;
    const title = noticeList[index].title;
    const subTitle = noticeList[index].subTitle;
    const detail = noticeList[index].detail;
    wx.navigateTo({
      url: `/pages/home/pages/notice_detail?title=${title}&subTitle=${subTitle}&detail=${detail}`,
    });
  }
})