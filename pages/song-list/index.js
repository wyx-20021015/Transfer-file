// pages/song-list/index.js
import {rankStore} from '../../store/index'
import {getSongListData} from '../../service/music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankName:"",
    Rank:"",
    songInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const rankName=options.rankName
    const type=options.type
    if(type=='songMenu'){
      console.log(options.id)
      getSongListData(options.id).then(res=>{
        console.log(res.data.playlist)
        this.setData({songInfo:res.data.playlist})
      })
    }
    else{
      this.setData({rankName})
      rankStore.onState(rankName,this.getSongData)
    }
  },
  getSongData:function(res){
    console.log(res)
    this.setData({songInfo:res})
  }
})