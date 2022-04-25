// pages/detail-video/index.js
import {getMvUrl,getMvDetail,getMvRelate} from '../../service/video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Url:{
      url:'1'
    },
    detail:{},
    related:{},
    danmuList: [{
      text: '第 1s 出现的弹幕',
      color: '#ff0000',
      time: 1
    }, {
      text: '第 3s 出现的弹幕',
      color: '#ff00ff',
      time: 3
    }],
    test:123
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getData(options.id)
  },
  getData(id){
    getMvUrl(id).then(res=>{
      this.setData({Url:res.data.data})
      console.log(this.data.Url)
    })
    getMvDetail(id).then(res=>{
      this.setData({detail:res.data})
    })
    getMvRelate(id).then(res=>{
      this.setData({related:res.data})
    })
  }
  
})