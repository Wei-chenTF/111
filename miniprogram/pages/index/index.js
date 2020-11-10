// pages/me/me.js
Page({

      /**
       * 页面的初始数据
       */
      data: {},
      addAlert() {
        wx.navigateTo({
          url: '/pages/add/add',
        })
      },

      


    
      // liq start
      getData() {



        var app=getApp()
        wx.cloud.callFunction({
                name: 'sendSubscribeMessage',
                data: {
                  openid: app.globalData.openid
                }
              })

        // var Tdata = {
        //   // "touser": 'oohGZ5DxurJBq1wiJq8Pk6STt1Ms',
        //   "touser":app.globalData.openid,
        //   "template_id": 'JfUaLD9OPbWBJiyCJuehYc5SUQfuK7yWqLYE0idCr4w',
        //   "page": '/pages/add/add',
        //   "data": {
        //     "thing5": {
        //       "value": 'test'
        //     },
        //     "date4": {
        //       "value": '2020-10-28 10:21'
        //     }

        //   },
        //   "miniprogramState": 'developer'
        // }

        // wx.login({
        //   success(res) {
        //     if (res.code) {
        //       //发起网络请求
        //       wx.request({

        //         url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1ef39e9aea36f919&secret=c791776c0dd3915ad7ec0ab8cb891be3',
        //         //获取openid接口  
        //         //             url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx1ef39e9aea36f919&secret=c791776c0dd3915ad7ec0ab8cb891be3&js_code='+res.code+'&grant_type=authorization_code',   
        //         method: 'GET',
        //         success: function (res) {
        //           var access_token = res.data.access_token
        //           // console.log(res)
        //           wx.request({
        //             url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=' + access_token,
        //             data: {
        //               "content": "台独"
        //             },
        //             method: 'POST',
        //             success: function (e) {
        //               console.log(e)
        //             }
        //           })
        //         }
        //       })
        //     } else {
        //       console.log('登录失败！' + res.errMsg)
        //     }
        //   }
        // })
        //14：58
        // wx.request({

        //   url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1ef39e9aea36f919&secret=c791776c0dd3915ad7ec0ab8cb891be3',
        //   //获取openid接口  
        //   //             url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx1ef39e9aea36f919&secret=c791776c0dd3915ad7ec0ab8cb891be3&js_code='+res.code+'&grant_type=authorization_code',   
        //   method: 'GET',
        //   success: function (res) {
        //     var access_token = res.data.access_token

        //     wx.request({
        //       url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + access_token,
        //       data:Tdata,
        //       method:'POST',
        //       success:function(e){
        //         console.log(e)
        //       }
        //     })
        //   }
        // })


            

            // wx.cloud.database().collection('subscribeMessage').get({
            //   //如果查询成功的话    
            //   success: res => {
            //     // console.log(res.data)

            //     var app = getApp()
            //     //获取系统时间
            //     var date = new Date()
            //     var year = date.getFullYear()
            //     var month = date.getMonth() + 1
            //     var day = date.getDate()
            //     var time = date.getHours() + ":" + date.getMinutes()
            //     var taskDate = '' + year + '-' + month + '-' + day
            //     console.log("今天是" + taskDate + " " + time + app.globalData.openid)

            //     // 遍历数据库中的每条数据，并获取data
            //     // res.data.forEach(i => {
            //     // console.log(i)

            //     // console.log(i)
            //     // 调用推送函数
            //     wx.cloud.callFunction({
            //       name: 'sendSubscribeMessage',
            //       data: {
            //         openid: app.globalData.openid
            //       }
            //     }).then(res => {
            //       console.log(res)
            //     }).catch(err => {
            //       console.error(err)
            //     })
            //     // });
            //     //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
            //     this.setData({
            //       ne: res.data
            //     })
            //   }
            // })
          },

          //liq end


          /**
           * 生命周期函数--监听页面加载
           */
          onLoad: function (options) {
            // setInterval(() => {
            //   this.getData();
            // }, 1000 * 60);

          },

          /**
           * 生命周期函数--监听页面初次渲染完成
           */
          onReady: function () {
            this.getData();

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