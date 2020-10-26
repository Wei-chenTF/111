// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init( {
  env: 'data-3g27hwj2149b13bc'
})
db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()  
  const _openid = wxContext.OPENID ||'oohGZ5DxurJBq1wiJq8Pk6STt1Ms'

  const dbResult = await db.collection('subscribeMessage').where({_openid}).get()
  const {data} =dbResult

  try {
    const result = await cloud.openapi.subscribeMessage.send(
      {
      touser:_openid,
      template_id: 'JfUaLD9OPbWBJiyCJuehYc5SUQfuK7yWqLYE0idCr4w',
      page: '/pages/index/index',
      data: {
        "thing5": {
          value: "吃饭"
        },
        "data4": {
          value: "2020-11-11"
        },
        
      },
     
    }

      // {
      //   "touser": _openid,
      //   "template_id": "JfUaLD9OPbWBJiyCJuehYc5SUQfuK7yWqLYE0idCr4w",
      //   "page": "/pages/index/index",
      //   "data": {
      //     "thing5": {
      //       "value": "吃饭"
      //     },
      //     "date4": {
      //       "value": "2020-11-11"
      //     },
         
      //   }
      // }
    )
    console.log(result)
    return {result, data}
  } catch (err) {
    console.log(err)
    return {err,data}
  }
}