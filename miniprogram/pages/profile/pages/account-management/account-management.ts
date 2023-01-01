import cache from "../../../../utils/cache";
import { requestBalanceAndRecord, requestIntegralAndRecord } from "../../../../api/apis";
import { IBalance, IIntegral } from "../../../../interfaces/account";

Page({
  data: {
    active: 0,
    currentIndex: 0,
    balanceData: {} as IBalance,
    initegralData: {} as IIntegral,
  },

  onLoad() {
    this.requestBalanceData();
  },

  onChange(event: WechatMiniprogram.TouchEvent) {
    const index = event.detail.index;
    if (index == 0) {
      this.requestBalanceData();
    } else {
      this.requestIntegralData();
    }
    this.setData({ currentIndex: index });
  },

  // 查询余额信息
  async requestBalanceData() {
    const result = await requestBalanceAndRecord(cache.get("userInfo")["id"]);
    (result.data as IBalance).accountRecords.map(record => {
      if (record.userIdFrom == cache.get("userInfo")["id"]) {
        record.payType = true;
      } else {
        record.payType = false;
      }
      return record;
    });
    this.setData({
      balanceData: result.data,
    });
  },

  // 查询积分信息
  async requestIntegralData() { 
    const result = await requestIntegralAndRecord(cache.get("userInfo")["id"]);
    this.setData({
      initegralData: result.data,
    });
  },

  // 余额提现
  balanceExpression(){
    wx.showToast({ title: "功能还未上线，敬请期待！", icon: "none" });
  }

});
