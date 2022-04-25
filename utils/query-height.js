// 查询图片的高度
export default function queryHeight(selector) {
  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    query.exec(resolve)
  })
}