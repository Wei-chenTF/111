// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init(
 
)
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _openid = wxContext.OPENID
  // const _openid=getApp().globalData.openid
  const date = new Date(event.date)
  const time = new Date(event.time)

  const result = await db.collection('subscribeMessage').add({
    data: {
      _openid,
      date,
      time,
      sended: 0
    }
  })

  return {
    event,
    result,
  }
}