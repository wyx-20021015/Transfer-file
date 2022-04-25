// pages/home-video/index.js
import {
  getTopMv
} from '../../service/video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMV: [],
    hasMore: true
  },
  getData: async function (offset) {
    if (!this.data.hasMore) return
    wx.showNavigationBarLoading()
    const res = await getTopMv(offset)
    let newData = this.data.topMV
    if (offset == 0) {
      newData = res.data.data
    } else {
      newData = newData.concat(res.data.data)
    }
    this.setData({
      topMV: newData,
      hasMore: res.data.hasMore
    })
    wx.hideNavigationBarLoading()
    if (offset === 0) {
      wx.stopPullDownRefresh()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getData(0)
  },
  onReachBottom: async function () {
    this.getData(this.data.topMV.length)
  },
  onPullDownRefresh: async function () {
    this.getData(0)
  },
  VideoClick(event){
    const id=event.currentTarget.dataset.item.id 
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${id}`,
    })
  }
})