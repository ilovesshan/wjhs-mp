import { IGoods, IOrder } from "../../../../interfaces/order";
import { requestRecycleOrdersByStatus, updateRecycleOrdersStatus } from "../../../../api/apis";
import { BASE_URL } from '../../../../api/request';
import Dialog from '@vant/weapp/dialog/dialog';

Page({
  data: {
    active: 0,
    show: false,
    baseUrl: BASE_URL,
    goodsList: [] as Array<IGoods>,
    tabBar: [
      { key: "待接单", value: "4" }, { key: "待上门", value: "5" }, { key: "待结算", value: "6" },
      { key: "已完结", value: "7" }, { key: "已超时", value: "8" }, { key: "取消订单", value: "9" },
    ]
  },

  onShow() {
    this.setData({ show: true })
  },

  onLoad() {
    this.requestGoodsList(4);
  },

  onChange(event: WechatMiniprogram.TouchEvent) {
    const status = Number(event.detail.name) + 4;
    this.requestGoodsList(status);
  },

  // 获取列表
  async requestGoodsList(status: number) {
    const result = await requestRecycleOrdersByStatus(status);
    const data = result.data.map((order: IOrder) => {
      order.showAppointmentTime = order.appointmentBeginTime.substring(0, 16) + " - " + order.appointmentEndTime.substring(11, 16);
      return order;
    })
    this.setData({
      goodsList: data,
    });
  },

  // 取消订单
  cancelOrder(e: WechatMiniprogram.TouchEvent) {
    Dialog.confirm({
      title: '取消订单',
      message: '亲亲，确定要取消订单吗？',
    })
      .then(async () => {
        const result = await updateRecycleOrdersStatus({ id: e.target.dataset.id, status: "9" });
        if (result.code == 200) {
          this.requestGoodsList(4);
        }
      })
      .catch(() => { });
  },

  // 联系骑手
  concatDriver(e: WechatMiniprogram.TouchEvent) {
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone,
    });
  },

  // 骑手已经到达
  driverArrival(e: WechatMiniprogram.TouchEvent){
    Dialog.confirm({
      title: '订单状态更新',
      message: '亲亲，确定骑手已经达到指定地点了吗？',
    })
      .then(async () => {
        const result = await updateRecycleOrdersStatus({ id: e.target.dataset.id, status: "6" });
        if (result.code == 200) {
          this.requestGoodsList(5);
        }
      })
      .catch(() => { });
  },

  // 订单详情
  toOrderDetailPage(e: WechatMiniprogram.TouchEvent) {
    const orderInfo = JSON.stringify(this.data.goodsList[e.currentTarget.dataset.index]);
    wx.navigateTo({
      url: `/pages/profile/pages/order-center/pages/order-detail/order-detail?orderInfo=${orderInfo}`
    });
  },

  // 结算订单
  settlementOrder(e: WechatMiniprogram.TouchEvent) {
    const orderInfo = JSON.stringify(this.data.goodsList[e.target.dataset.index]);

    wx.navigateTo({
      url: `/pages/profile/pages/order-pay/order-pay?orderInfo=${orderInfo}`
    });
  },

  // 重新预约
  reAppointment() {
    wx.showToast({ title: "功能还未上线，敬请期待！", icon: "none" });
  },

});