import { requestNotice, requestSwiper } from "../../api/apis";
import { BASE_URL } from "../../api/request";
import { ISwiper } from "../../interfaces/swiper"
import { INotice } from "../../interfaces/notice"

Page({
  data: {
    swiperList: [] as Array<ISwiper>,
    noticeList: [] as Array<INotice>,
  },

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

  toWebview(e: WechatMiniprogram.TouchEvent) {
    const index = e.target.dataset.index;
    const pageTitle = this.data.swiperList[index].title;
    const pagePath = this.data.swiperList[index].link;
    wx.navigateTo({
      url: `/components/webView/webView?pageTitle=${pageTitle}&pagePath=${pagePath}`,
    });
  },


  toNoticeDetail(e: WechatMiniprogram.TouchEvent) {
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