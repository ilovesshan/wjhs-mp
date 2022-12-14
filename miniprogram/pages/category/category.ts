import { BASE_URL } from "../../api/request";
import { requesRecycleGoods } from "../../api/apis";
import { IRecycleGoods } from "../../interfaces/recycleGoods";

Page({
  data: {
    isSearch: false,
    BASE_URL: BASE_URL,
    currentIndex: 0,
    kw: "",
    searchResult: [1],
    navItems: [],
    recycleGoodList: [] as Array<IRecycleGoods>,
  },

  onLoad() {
    requesRecycleGoods().then(res => {
      if (res.code == 200 && res.data) {
        this.setData({
          recycleGoodList: res.data,
          navItems: res.data.map((goodsType: { name: any; }) => ({ text: goodsType.name }))
        })
      }
    })
  },

  onClickNav(event: { detail: { index: any; }; }) {
    this.setData({
      currentIndex: event.detail.index
    })
  },

  onSearch(e: { detail: string }) {
    this.setData({
      searchResult: []
    });
    if (e.detail === "") {
      this.setData({
        isSearch: false,
      })
      return;
    }

    const searchResult: Array<any> = [];
    this.data.recycleGoodList.forEach(item => {
      if (item.name.includes(e.detail)) {
        searchResult.push(...item.recycleGoods);
      } else {
        item.recycleGoods.forEach((goods: { name: string }) => {
          if (goods.name.includes(e.detail)) {
            searchResult.push(goods);
          }
        });
      }
    });

    this.setData({
      isSearch: true,
      searchResult,
    })
  },
  onClear() {
    this.setData({
      isSearch: false,
    })
  }
})