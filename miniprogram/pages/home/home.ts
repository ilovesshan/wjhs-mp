import { requestContribution, requestNotice, requestSwiper } from "../../api/apis";
import { BASE_URL } from "../../api/request";
import { ISwiper } from "../../interfaces/swiper"
import { INotice } from "../../interfaces/notice"
import { IContribution } from "../../interfaces/contribution";

Page({
  data: {
    swiperList: [] as Array<ISwiper>,
    noticeList: [] as Array<INotice>,
    contribution: {} as Array<IContribution>,
  },

  onLoad() {
    this.getSwiper();
    this.getNotice();
    this.geContribution();
  },

  getSwiper() {
    requestSwiper().then(res => {
      const list = res.data.map((item: ISwiper) => {
        item.attachment.url = BASE_URL + item.attachment.url;
        return item;
      });
      this.setData({
        swiperList: list,
      });
    });
  },

  getNotice() {
    requestNotice().then(res => {
      this.setData({
        noticeList: res.data.slice(0, 2),
      });
    });
  },

  geContribution(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const result = await requestContribution();
      this.setData({
        contribution: result.data,
      });
      resolve(true);
    })
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
  },

  // 立即预约
  appointmentTap() {
    wx.switchTab({
      url: "/pages/appointment/appointment"
    });
  },

  // 积分商城
  integralShoopTap() {
    wx.showToast({ title: "功能还未上线，敬请期待！", icon: "none" });
  },

  onPullDownRefresh() {
    this.geContribution().then(_ => {
      wx.stopPullDownRefresh();
    });
  }
})