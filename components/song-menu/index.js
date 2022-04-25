// components/song-menu-area/index.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "默认歌单"
    },
    songMenu: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    songMenuItemClick(event){
      const id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/song-list/index?id=${id}&type=songMenu`,
      })
    }
  }
})
