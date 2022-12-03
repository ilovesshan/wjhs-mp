const showToast = function (content: string, duration: number): void {
  if (!duration) duration = 2000
  wx.showToast({
    title: content,
    icon: 'none',
    duration: duration,
  })
}

var isShowLoading: boolean = false
const showLoading = function (title: string): void {
  if (isShowLoading) return
  wx.showLoading({
    title: title ? title : '',
    mask: true,
    success: () => {
      isShowLoading = true
    }
  })
}

const hideLoading = function (): void {
  if (!isShowLoading) return
  isShowLoading = false
  wx.hideLoading()
}

module.exports = {
  showToast,
  showLoading,
  hideLoading
}