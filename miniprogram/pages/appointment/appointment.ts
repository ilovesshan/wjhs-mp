import { timeRangeKeys, timeRangeValues, parseTime } from '../../utils/appointmentTimeParser';
import type { IAddress } from '../../interfaces/address';
import { IOrder } from '../../interfaces/order';
import { requesRecycleGoods, requestRecycleOrders } from '../../api/apis';
import { IRecycleGoods, IRecycleGoodsDetail } from '../../interfaces/recycleGoods';
import cache from '../../utils/cache';
import { BASE_URL } from '../../api/request';

Page({
  data: {
    defaultAddress: {} as IAddress,
    orderInfo: {} as IOrder,
    fileList: [] as Array<{ url: string, name: string }>,
    showTimePicker: false,
    showGoodsPicker: false,
    appointmentShowTime: "",
    filterData: {} as { [key: string]: Array<string> },
    goodsColumns: [] as Array<{ values: Array<string> }>,
    recycleGoodList: [] as Array<IRecycleGoods>,
    chooseRecycleGoodList: [] as Array<IRecycleGoodsDetail>,
    timeColumns: [
      { values: timeRangeKeys, },
      { values: timeRangeValues },
    ] as Array<{ values: Array<string> }>,
  },

  onLoad() {
    // 获取回收商品列表
    requesRecycleGoods().then(res => {
      if (res.code == 200 && res.data) {
        let firstTypeName = (res.data[0] as IRecycleGoods).name;
        const filterData = {} as { [key: string]: Array<string> };
        res.data.forEach((goodsType: IRecycleGoods) => {
          filterData[goodsType.name] = [];
          goodsType.recycleGoods.forEach(goods => {
            filterData[goodsType.name].push(goods.name)
          });
        });
        const goodsColumns: Array<{ values: Array<string> }> = [
          {
            values: Object.keys(filterData),
          },
          {
            values: filterData[firstTypeName],
          },
        ]
        this.setData({ goodsColumns, filterData, recycleGoodList: res.data, })
      }
    })
  },

  onTimePickerConfirm(e: WechatMiniprogram.TouchEvent) {
    const [keyIndex, valueIndex] = e.detail.index;
    const [appointmentBeginTime, appointmentEndTime, appointmentShowTime] = parseTime(keyIndex, valueIndex);
    this.setData({
      showTimePicker: false,
      ['orderInfo.appointmentBeginTime']: appointmentBeginTime,
      ['orderInfo.appointmentEndTime']: appointmentEndTime,
      appointmentShowTime: appointmentShowTime,
    })
  },

  onTimePickerCancel() {
    this.setData({ showTimePicker: false })
  },

  showTimerPicker() {
    this.setData({ showTimePicker: true })
  },

  showGoodsPicker() {
    this.setData({ showGoodsPicker: true })
  },

  removeGoods(e: WechatMiniprogram.TouchEvent) {
    const index = e.target.dataset.index;
    const data = JSON.parse(JSON.stringify(this.data.chooseRecycleGoodList));
    data.splice(index, 1);
    this.setData({
      chooseRecycleGoodList: data,
    });
    this.calcTotalPriceAndWeight()
  },

  onGoodsPickerConfirm(e: WechatMiniprogram.TouchEvent) {
    const [keyIndex, valueIndex] = e.detail.index;
    const { chooseRecycleGoodList, recycleGoodList } = this.data;
    const addedGoods = recycleGoodList[keyIndex].recycleGoods[valueIndex];
    // 判断是否已经添加了
    const hasExists = chooseRecycleGoodList.find(goods => goods.id == addedGoods.id);
    if (hasExists) {
      wx.showToast({ title: "商品已经添加了", icon: "none" });
      return;
    } else {
      // 默认重量 1
      addedGoods.weight = 1.0;
      this.setData({
        showGoodsPicker: false,
        chooseRecycleGoodList: [...chooseRecycleGoodList, addedGoods]
      });
      // 计算总价格 , 总重量
      this.calcTotalPriceAndWeight();
    }
  },

  onGoodsPickerCancel() {
    this.setData({ showGoodsPicker: false })
  },


  // 计算总价格 , 总重量, 积分
  calcTotalPriceAndWeight() {
    const { chooseRecycleGoodList } = this.data;
    const totalPrice = chooseRecycleGoodList.reduce((tol, cur) => tol + Number(cur.weight) * Number(cur.userPrice), 0);
    const totalWeight = chooseRecycleGoodList.reduce((tol, cur) => tol + Number(cur.weight), 0);
    const totalIntegral = chooseRecycleGoodList.reduce((tol, cur) => tol + Number(cur.integral), 0);
    this.setData({
      chooseRecycleGoodList: chooseRecycleGoodList,
      ['orderInfo.totalWeight']: Number(totalWeight).toFixed(2),
      ['orderInfo.tradingMoney']: Number(totalPrice).toFixed(2),
      ['orderInfo.totalIntegral']: Number(totalIntegral).toFixed(1),
    });
  },

  weightChange(e: any) {
    const index = e.target.dataset.index;
    const { chooseRecycleGoodList } = this.data;
    chooseRecycleGoodList[index].weight = Number(e.detail);
    this.calcTotalPriceAndWeight();

    this.setData({
      chooseRecycleGoodList: chooseRecycleGoodList,
    });
  },

  onChange(e: WechatMiniprogram.TouchEvent) {
    const { picker, value } = e.detail;
    picker.setColumnValues(1, this.data.filterData[value[0]]);
  },

  chooseAddress() {
    wx.navigateTo({
      url: `/pages/profile/pages/address-management/address-management?id=${this.data.defaultAddress.id}`
    })
  },

  afterRead(e: WechatMiniprogram.TouchEvent) {
    const { file } = e.detail;
    wx.uploadFile({
      url: BASE_URL + '/attachments',
      filePath: file.url,
      name: 'file',
      header: {
        "Authorization": "Openid " + cache.get("openId"),
      },
      success: (res) => {
        const id = JSON.parse(res.data).data.id;
        // 上传完成需要更新 fileList
        const fileList = [...this.data.fileList, { url: file.url, name: id }];
        this.setData({ fileList });
      },
    });
  },

  noteChange(e: WechatMiniprogram.TouchEvent) {
    this.setData({
      ['orderInfo.note']: e.detail,
    })
  },


  // 删除图片
  deleteImg(e: WechatMiniprogram.TouchEvent) {
    let index = e.detail.index;
    const fileList = this.data.fileList;
    fileList.splice(index, 1);
    this.setData({
      fileList
    })
  },

  // 提交订单
  async submitOrder() {
    const { orderInfo, chooseRecycleGoodList } = this.data;

    if (!this.data.defaultAddress.id) {
      wx.showToast({ title: "请选择上门地址", icon: "none" });
      return;
    }

    if (chooseRecycleGoodList.length == 0) {
      wx.showToast({ title: "请选择回收商品", icon: "none" });
      return;
    }

    if (!orderInfo.appointmentBeginTime || !orderInfo.appointmentEndTime) {
      wx.showToast({ title: "请选择预约时间", icon: "none" });
      return;
    }


    // 计算总价格 和 总重量
    this.calcTotalPriceAndWeight();

    const goodsList: Array<{ goodsId: string, weight: number }> = [];
    chooseRecycleGoodList.forEach(goods => {
      goodsList.push({ goodsId: goods.id, weight: goods.weight })
    })

    // 处理附件
    const attachmentIds = this.data.fileList.map(item => item.name).join(",");


    this.setData({
      ['orderInfo.addressId']: this.data.defaultAddress.id,
      ['orderInfo.goodsList']: goodsList,
      ['orderInfo.orderType']: 10,
      ['orderInfo.status']: 4,
      ['orderInfo.submitUserId']: cache.get("userInfo").id,
      ['orderInfo.noteAttachmentIds']: attachmentIds,
    });

    const result = await requestRecycleOrders(this.data.orderInfo);
    if (result.code == 200) {
      // 下单成功 数据重置
      this.setData({
        orderInfo: {} as IOrder,
        fileList: [],
        appointmentShowTime: "",
        chooseRecycleGoodList: [],
      });
      wx.navigateTo({
        url: "/components/order-success/order-success"
      });
    } else {
      wx.showToast({ title: result.message, icon: "none" });
    }
  },
})