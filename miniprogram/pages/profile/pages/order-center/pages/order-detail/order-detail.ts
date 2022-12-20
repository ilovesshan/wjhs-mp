import { BASE_URL } from "../../../../../../api/request";
import { IOrder } from "../../../../../../interfaces/order";
import { getStringByCode } from "../../../../../../utils/systemDict"

Page({

  data: {
    baseurl: BASE_URL,
    fileList: [] as Array<{ url: string }>,
    orderInfo: {}
  },

  onLoad(params: { orderInfo: string }) {
    const orderInfo: IOrder = JSON.parse(params.orderInfo);
    const attachments: Array<{ url: string }> = [];
    orderInfo.statusText = getStringByCode(orderInfo.status);
    orderInfo.attachments.forEach(item => {
      attachments.push({ url: this.data.baseurl + item.url });
    })
    this.setData({
      orderInfo,
      fileList: attachments,
    });
  },
})