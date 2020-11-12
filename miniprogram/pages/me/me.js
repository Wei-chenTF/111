// pages/me/me.js
// const db = wx.cloud.database()
// const cont=db.collection('subscribeMessage')
Page({
  /**
   * 页面的初始数据
   */
  data: {
      ne:[],  //这是一个空的数组，等下获取到云数据库的数据将存放在其中
  },
 
  onLoad: function (options) {
    var _this=this;
    //1、引用数据库   
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'data-3g27hwj2149b13bc'
    })
    //2、开始查询数据了  news对应的是集合的名称   
    db.collection('subscribeMessage').get({
      //如果查询成功的话   
       
      success: res => {
        
        console.log(res.data)

        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          ne: res.data
        })
      }
    })
  },    


  del(e){
    
    // console.log(e.detail.value)
    var id=e.currentTarget.dataset.index;
    console.log(id)
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'data-3g27hwj2149b13bc'
    })
    db.collection('subscribeMessage').doc(id).remove({
      success(res) {
          console.log(res.data)
      }
  })
  this.onLoad()
 
    
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
   * 生命周期函数-- 监听页面卸载
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