export interface IBalance {
  id: string,
  userType: string,
  userId: string,
  balance: number,
  isDelete: string,
  accountRecords: Array<IBalanceRecord>,
  createTime: string,
}


export interface IBalanceRecord {
  id: string,
  userTypeFrom: string,
  userTypeTo: string,
  userIdFrom: string,
  userIdTo: string,
  payStatus: string,
  payType: boolean,
  tradingId: string,
  tradingMoney: number,
  tradingType: string,
  tradingNote: string,
  isDelete: string,
  createTime: string,
}


export interface IIntegral {
  id: string,
  userId: string,
  integral: number,
  isDelete: string,
  integralRecords: Array<IIntegralRecord>,
  createTime: string,
}


export interface IIntegralRecord {
  id: string,
  userId: string,
  orderId: string,
  payStatus: string,
  tradingIntegral: number,
  isDelete: string,
  createTime:  string,
}