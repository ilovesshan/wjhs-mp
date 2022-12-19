
export interface IGoods {
  goodsId: string,
  weight: number,
}

export interface IOrder {
  id: string,
  addressId: string,
  appointmentBeginTime: string,
  appointmentEndTime: string,
  note: string,
  noteAttachmentIds: string,
  orderType: string,
  receiveUserId: string,
  status: string,
  submitUserId: string,
  totalIntegral: number,
  totalWeight: number,
  tradingMoney: number,
  showAppointmentTime: string,
  goodsList: Array<IGoods>
}

export interface IOrderUpdate {
  id: String,
  status: String,
  receiveUserId?: String,
}


export interface IOrderPay {
  qrPath: string,
  orderId: string,
  appointmentTime: string,
  money: number,
  weight: number,
}
