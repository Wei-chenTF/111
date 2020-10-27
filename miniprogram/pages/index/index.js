// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  addAlert() {
    wx.navigateTo({
      url: '/pages/add/add',
    })
  },

  alert() {
    wx.cloud.callFunction({
      name:'sendSubscribeMessage'
    }).then(res =>{
      console.log(res)
    }).catch(err=>{
      console.error(err)
    })
  },


// liq start
getData(){
    wx.cloud.database().collection('subscribeMessage').get({
      //如果查询成功的话    
      success: res => {
        // console.log(res.data)

        //获取系统时间
        var date=new Date()
        var year=date.getFullYear()
        var month=date.getMonth()+1
        var day=date.getDate()
        var time=date.getHours()+":"+date.getMinutes()
        var taskDate=''+year+'-'+month+'-'+day
        console.log("今天是"+taskDate+" "+time)

        //遍历数据库中的每条数据，并获取data
        res.data.forEach(i => {
          // console.log(i)
          if (i.date===taskDate&&i.time===time) {
            console.log(i)
            调用推送函数
            wx.cloud.callFunction({
              name:'sendSubscribeMessage'
            }).then(res =>{
              console.log(res)
            }).catch(err=>{
              console.error(err)
            })


          }
        });

        


        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          ne: res.data
        })
      }
    })
},

//liq end



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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})