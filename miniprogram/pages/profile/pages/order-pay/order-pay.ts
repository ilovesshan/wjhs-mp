import { BASE_URL } from "../../../../api/request";
import { IOrder, IOrderPay } from "../../../../interfaces/order";

Page({
  data: {
    baseUrl: BASE_URL,
    orderPayInfo: {
      qrPath: '',
      orderId: '',
      appointmentTime: '',
      money: 0,
      weight: 0,
    } as IOrderPay,
  },

  onLoad(params: { orderInfo: string }) {
    // 根据用户openID + 骑手ID + 订单ID 生成一个二维码链接 骑手扫码即可付款
    const orderInfo: IOrder = JSON.parse(params.orderInfo);
    console.log(orderInfo);
    const qrPath = BASE_URL + '/pay' + orderInfo.submitUserId + orderInfo.receiveUserId + orderInfo.id;
    this.setData({
      ["orderPayInfo.qrPath"] : qrPath,
      ["orderPayInfo.orderId"] :  orderInfo.id,
      ["orderPayInfo.showAppointmentTime"] :  orderInfo.showAppointmentTime,
      ["orderPayInfo.money"] : orderInfo.tradingMoney,
      ["orderPayInfo.weight"] : orderInfo.totalWeight,
    })
  },
});