const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //审核敏感词
  checkText(text) {

    //发起网络请求
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1ef39e9aea36f919&secret=c791776c0dd3915ad7ec0ab8cb891be3',
      method: 'GET',
      success: function (res) {
        var access_token = res.data.access_token
        // console.log(res)
        wx.request({
          url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=' + access_token,
          data: {
            "content": text
          },
          method: 'POST',
          success: function (e) {
            if (e.data.errcode == 0) {             
              return true
            } else {
              return false
            }
          }
        })
      }
    })

  },
  addAlert(e) {
    let {
      name
    } = e.detail.value
    let date = this.data.date
    let time = this.data.time

    //date = new Date(date).getTime()
    //time = new Date(time).getTime()

    let flag = this.checkText(name) || this.checkText(date) || this.checkText(time)
    
    let checked = this.check(name, date, time)
    if (checked && !flag) {
    
      db.collection('birthday').add({
        data: {
          name,
          date,
          time
        }
      }).then(res => {
        if (res._id) {
          wx.showToast({
            title: '添加成功',
          })
          setTimeout(() => {
            wx.navigateTo({


              url: `/pages/add/subscribeMessage?date=${date}&name=${name}&time=${time}`,
            })
          }, 1600)
        }

      })
    }
  },

  //将选择的日期和时间显示
  selectDate(e) {
    this.setData({
      date: e.detail.value
    })
  },

  selectTime(e) {
    this.setData({
      time: e.detail.value
    })
  },

  //检查有没有信息
  check(name, date, time) {
    let checked = true
    if (!name) {
      wx.showToast({
        title: '请输入提醒事项',
        image: '/images/alert.png'
      })
      checked = false
    }

    if (!date) {
      wx.showToast({
        title: '请选择提醒日期',
        image: '/images/alert.png'
      })
      checked = false
    }

    if (!time) {
      wx.showToast({
        title: '请选择提醒时间',
        image: '/images/alert.png'
      })
      checked = false
    }
    return checked

  },


  onShareAppMessage: function () {

  }
})