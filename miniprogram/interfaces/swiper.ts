import { IAttachment } from "./common";

export interface ISwiper {
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
