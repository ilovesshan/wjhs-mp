import { IUserFeedback } from "../../../../interfaces/Userfeedback";
import { selectUserFeedbackList } from "../../../../api/apis";
import cache from "../../../../utils/cache";

Page({
  data: {
    feedbackList: [] as Array<IUserFeedback>
  },
  onShow() {
    this.getUserFeedbackList();
  },

  async getUserFeedbackList() {
    const result = await selectUserFeedbackList(cache.get("userInfo").id);
    this.setData({
      feedbackList: result.data,
    });
  },

  addFeedback() {
    wx.navigateTo({
      url: "/pages/profile/pages/suggets-feedback/suggets-feedback"
    });
  }
})