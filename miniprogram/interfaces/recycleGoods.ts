import { IAttachment } from "./common";

export interface IRecycleGoods {
  id: string,
  name: string,
  describe: string,
  status: string,
  recycleGoods: Array<IRecycleGoodsDetail>,
  createTime: string,
}

export interface IRecycleGoodsDetail {
  weight: number,
  id: string,
  typeId: string,
  name: string,
  describe: string,
  attachmentId: string,
  integral: number,
  userPrice: number,
  driverPrice: number,
  recycleCenterPrice: number,
  attachment: IAttachment,
  status: string,
  createTime: string,
}