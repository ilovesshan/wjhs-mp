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
      integral: 0,
    } as IOrderPay,
  },

  onLoad(params: { orderInfo: string }) {
    // 根据用户ID + 骑手ID + 订单ID 生成一个二维码链接 骑手扫码即可付款
    const orderInfo: IOrder = JSON.parse(params.orderInfo);
    //http://localhost/recycleOrders/pay/2bcbc134244e40b8b535eb11229a0de7/78fb45d7ac474097a1c9a71ce7ae0d4c/c863700de87a498a94bc3d5144ae6ed1
    const qrPath = `${BASE_URL}/recycleOrders/pay/${orderInfo.submitUserId}/${orderInfo.receiveUserId}/${orderInfo.id}`
    this.setData({
      ["orderPayInfo.qrPath"]: qrPath,
      ["orderPayInfo.orderId"]: orderInfo.id,
      ["orderPayInfo.showAppointmentTime"]: orderInfo.showAppointmentTime,
      ["orderPayInfo.money"]: orderInfo.tradingMoney,
      ["orderPayInfo.weight"]: orderInfo.totalWeight,
      ["orderPayInfo.integral"]: orderInfo.totalIntegral,
    })
  },
});