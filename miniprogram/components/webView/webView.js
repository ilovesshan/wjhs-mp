Page({
  data: {
    pagePath: "",
    pageTitle: "",
  },

  onLoad(options) {
    const { pagePath, pageTitle} = options;
    if (options && pagePath) {
      this.setData({
        pagePath,
        pageTitle,
      });
    };
    if (pageTitle) {
      wx.setNavigationBarTitle({
        title: pageTitle,
      });
    }
  }
})