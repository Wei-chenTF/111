//app.js
App({
    globalData:{
      openid:null,
      mingan:null
    },
    onLaunch: function () {
      var that=this
     wx.login({ 
        success (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              //获取openid接口  
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx1ef39e9aea36f919&secret=c791776c0dd3915ad7ec0ab8cb891be3&js_code='+res.code+'&grant_type=authorization_code',   
              method:'GET',
              success:function(res){
                that.globalData.openid=res.data.openid
                // console.log(that.globalData.openid)
              }
         })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
      
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      } else {
        wx.cloud.init({
          // env 参数说明：
          //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx） 会默认请求到哪个云环境的资源
          //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
          //   如不填则使用默认环境（第一个创建的环境）
          // env: 'my-env-id',
          traceUser: true,
        })
      }
  
      
  //      console.log(this.globalData)
    }
  })
  