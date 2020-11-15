const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch1Checked:0,
    swtich:0,
    array: ['打卡了', '吃饭', '上课', '开会','生日','抢购','其他'],
    objectArray: [
      {
        id: 0,
        name: '打卡了'
      },
      {
        id: 1,
        name: '吃饭'
      },
      {
        id: 2,
        name: '上课'
      },
      {
        id: 3,
        name: '开会'
      },
      {
        id: 4,
        name: '生日'
      },
      {
        id: 5,
        name: '抢购'
      },
      {
        id: 6,
        name: '其他'
      }
    ],
    
  },

  switch1Change(e){ 
    var that=this
    console.log(e.detail.value)
    if (e.detail.value){  
      that.setData({ swtich: 1 })//当前页面变量
    }else{ 
      that.setData({ swtich: 0 })//当前页面变量
       }
       console.log(that.data.swtich)
      },
  addAlert(e) {
    // console.log(this.data.swtich)
    // let {name} = e.detail.value
    let date = this.data.date
    let time = this.data.time
    let index = this.data.index
    let name=this.data.array[index]
    let swtich=this.data.swtich

    console.log(swtich)
    let checked = this.check(name, date, time)
    if (checked) {
      db.collection('birthday').add({
        data: {
          name,
          date,
          time,
          swtich
        }
      }).then(res => {
        if (res._id) {
          wx.showToast({
            title: '添加成功',
          })
          setTimeout(() => {
            wx.navigateTo({
              url: `/pages/add/subscribeMessage?date=${date}&name=${name}&time=${time}&switch=${swtich}`,
            })
          }, 1600)
        }
      })
    }else{

    }
  },
  //审核敏感词
  // checkText(text) {
  //   //发起网络请求
  //   wx.request({
  //     url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1ef39e9aea36f919&secret=c791776c0dd3915ad7ec0ab8cb891be3',
  //     method: 'GET',
  //     success: function (res) {
  //       var access_token = res.data.access_token
  //       wx.request({
  //         url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=' + access_token,
  //         data: {
  //           "content": text
  //         },
  //         method: 'POST',
  //         success: function (e) {
  //           if (e.data.errcode == 87014) {
  //             wx.showToast({
  //               title: '事件内容违规',
  //               image: '/images/alert.png'
  //             })
  //             return false
  //           } else {
  //             return true
  //           }

  //         }
  //       })
  //     }
  //   })
  // },
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
  selectThing(e) {
    this.setData({
      index: e.detail.value
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