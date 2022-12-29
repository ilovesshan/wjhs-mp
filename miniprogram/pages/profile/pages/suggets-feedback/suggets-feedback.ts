import { IUserFeedbackCreate } from "../../../../interfaces/Userfeedback";
import { BASE_URL } from "../../../../api/request";
import Cache from "../../../../utils/cache";
import { requestUserFeedback } from "../../../../api/apis";

Page({
  data: {
    feedbackData: {
      feedbackTitle: "",
      feedbackDetail: "",
      attachmentId: "",
    } as IUserFeedbackCreate,

    fileList: [] as Array<{ url: string }>,
  },

  afterRead(event: WechatMiniprogram.TouchEvent) {
    const { file } = event.detail;
    wx.uploadFile({
      url: BASE_URL + '/attachments',
      filePath: file.url,
      name: 'file',
      header: {
        "Authorization": "Openid " + Cache.get("openId"),
      },
      success: (res) => {
        ``
        const data = JSON.parse(res.data).data;
        this.setData({
          fileList: [{ url: BASE_URL + data.url }],
          ["feedbackData.attachmentId"]: data.id,
        });
      },
      fail: (err) => {
        console.log(err);
        wx.showToast({ title: "上传失败,请稍后再试", icon: "none" })
      }
    });
  },

  deleteImg() {
    this.setData({
      fileList: [],
      ["feedbackData.attachmentId"]: "",
    })
  },

  onfeedbackTitleChange(e: WechatMiniprogram.TouchEvent) {
    this.setData({
      ["feedbackData.feedbackTitle"]: e.detail,
    });
  },
  onfeedbackDetailChange(e: WechatMiniprogram.TouchEvent) {
    this.setData({
      ["feedbackData.feedbackDetail"]: e.detail,
    });
  },

  async feedback() {
    if (!this.data.feedbackData.feedbackTitle) {
      wx.showToast({ title: "反馈标题不能为空", icon: "none" })
      return;
    }
    const result = await requestUserFeedback(this.data.feedbackData);
    if (result.code == 200) {
      wx.showToast({ title: "感谢您的反馈，我们会尽快处理", icon: "none" });
      setTimeout(() => wx.navigateBack(), 800);
    } else {
      wx.showToast({ title: result.message, icon: "none" })
    }
  }
})