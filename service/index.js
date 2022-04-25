const BASE_URL = "http://123.207.32.32:9001"
class WRequset {
  request(url, method, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url:  BASE_URL+url,
        method,
        data: params,
        success: (res) => {
          // console.log(res)
          resolve(res)
        },
        fail: (err) => {
          // console.log(err)
          reject(err)
        }
      })
    })
  }
  get(url, params) {
    return this.request(url, 'GET', params)
  }
  post(url, data) {
    return this.request(url, 'POST', data)
  }

}

const wRequest = new WRequset()
export default wRequest