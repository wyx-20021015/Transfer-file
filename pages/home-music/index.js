// pages/home-music/index.js
const rankingMap = { 0: "newRanking", 1: "hotRanking", 2: "originRanking", 3: "upRanking" }

import {
  rankStore
} from '../../store/index'
import queryHeight from '../../utils/query-height'
import {
  getBanners,
  getSongMenu
} from "../../service/music"
import throttle from '../../utils/throttle'

const throttleQueryRect = throttle(queryHeight)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 225,
    banners: [],
    recommend:[],
    hotSongMenu:[],
    rankings: { 0: {}, 2: {}, 3: {} }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    rankStore.dispatch('getRankData')
    rankStore.onState("hotRanking",res=>{
      if(res.tracks){
        const recommendSongs = res.tracks.slice(0,6)
        this.setData({recommend:recommendSongs})
      }
    }) 
    rankStore.onState("newRanking", this.getRankingHandler(0))
    rankStore.onState("originRanking", this.getRankingHandler(2))
    rankStore.onState("upRanking", this.getRankingHandler(3))
  },
  getData() {
    getBanners().then(res => {
      this.setData({
        banners: res.data.banners
      })
    })
    getSongMenu().then(res => {
      this.setData({ hotSongMenu: res.data.playlists })
    })

  },
  getRankingHandler: function(idx) {
    return (res) => {
      if (Object.keys(res).length === 0) return
      const name = res.name
      const coverImgUrl = res.coverImgUrl
      const playCount = res.playCount
      const songList = res.tracks.slice(0, 3)
      const rankingObj = {name, coverImgUrl, playCount, songList}
      const newRankings = { ...this.data.rankings, [idx]: rankingObj}
      this.setData({ 
        rankings: newRankings
      })
    }
  },
  searchClick: function () {
    wx.navigateTo({
      url: '../detail-search/index',
    })
  },
  navigateSongList(rankName){
    wx.navigateTo({
      url: `/pages/song-list/index?rankName=${rankName}`,
    })
  },
  headerClick:function(){
    this.navigateSongList('hotRanking')
  },
  rankClick(event){
    const ID=event.currentTarget.dataset.idd
    const rankName=rankingMap[ID]
    this.navigateSongList(rankName)
  },
  ImageLoaded: function () {
    throttleQueryRect('.img').then(res => {
      this.setData({
        height: res
      })
    })
  }
})