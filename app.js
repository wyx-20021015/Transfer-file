// app.js
App({
  onLaunch: function () {
    const info = wx.getSystemInfoSync()
    this.global.screenWidth = info.screenWidth
    this.global.screenHeight=info.screenHeight
  },
  global: {
    screenWidth: 0,
    screenHeight: 0
  }
})