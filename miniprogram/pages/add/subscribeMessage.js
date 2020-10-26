const db = wx.cloud.database()
const dbutil = require('../../utils/db.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    this.setData(e)

  },
 
  subscribeMessage() {
    let date = {
      "date": this.data.date,
      "name": this.data.name,
      "time": this.data.time,
      "sended": 0
    }
    wx.requestSubscribeMessage({
      tmplIds: ['JfUaLD9OPbWBJiyCJuehYc5SUQfuK7yWqLYE0idCr4w'],
      success(res) {
        console.log(res)
        if (res['JfUaLD9OPbWBJiyCJuehYc5SUQfuK7yWqLYE0idCr4w'] == 'accept') {
          dbutil.subscribeMessage(date)
                 
        }
      },
      complete() {
         wx.reLaunch({
           url: '/pages/me/me',
         })
       
      }
    })
  },
  back() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})