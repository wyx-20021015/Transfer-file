// pages/detail-search/index.js
import debounce from "../../utils/debounce"
import {
  handleInputing,
  hotSearch,
  searchHandler
} from "../../service/search"
const debounceGetSearchSuggest = debounce(handleInputing, 300)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [],
    hots: [],
    Searching:"",
    value: "",
    nodes: [],
    NODE: [],
    SearchResult:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    hotSearch().then(res => {
      // console.log(res.data.result.hots)
      this.setData({
        hots: res.data.result.hots
      })
    })
  },
  hotsItemClick:function(event){
    const value=event.currentTarget.dataset.value.first
    searchHandler(value).then(res=>{
      this.setData({SearchResult:res.data.result.songs})
    })
  },
  inputing: function (event) {
    if (!event.detail.length) {
      this.setData({
        info: [],
        value: ""
      })
      debounceGetSearchSuggest.cancel()
      return
    }
    if (event.detail) {
      debounceGetSearchSuggest(event.detail).then(res => {
        this.setData({
          info: res.data.result.allMatch,
          value: event.detail
        })
        // console.log(this.data.info)
        if (!res.data.result.allMatch) return
        const nameList = res.data.result.allMatch.map(item => item.keyword)
        const NODE = []
        for (const words of nameList) {
          const nodeItem = []
          if (words.toUpperCase().startsWith(event.detail.toUpperCase())) {
            const value1 = words.slice(0, event.detail.length)
            const value2 = words.slice(event.detail.length)
            const node1 = {
              name: 'span',
              attrs: {
                style: 'color:#26ce8a;font-size: 14px;'
              },
              children: [{
                type: 'text',
                text: value1
              }]
            }
            const node2 = {
              name: 'span',
              attrs: {
                style: 'color:black;font-size: 14px;'
              },
              children: [{
                type: 'text',
                text: value2
              }]
            }
            nodeItem.push(node1)
            nodeItem.push(node2)
            NODE.push(nodeItem)
          } else {
            const node3 = {
              name: 'span',
              attrs: {
                style: 'font-size: 14px;'
              },
              children: [{
                type: 'text',
                text: words
              }]
            }
            nodeItem.push(node3)
            NODE.push(nodeItem)
          }
        }
        this.setData({
          NODE
        })
      })

    } else {
      this.setData({
        info: []
      })
    }
  },
  onSearch(event){
    this.setData({Searching:event.detail})
    searchHandler(event.detail).then(res=>{
      console.log(res.data.result.songs)
      this.setData({SearchResult:res.data.result.songs})
    })
  }
})