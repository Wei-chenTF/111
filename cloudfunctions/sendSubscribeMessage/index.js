// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init( {
  env: 'data-3g27hwj2149b13bc'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  //获取系统时间，注意云函数时区问题，时区差为8小时；
  var date=new Date(Date.now() + (8 * 60 * 60 * 1000))
  date.toLocaleDateString("zh-cn" ,{timeZone:"Asia/Shanghai"})
  var year=date.getFullYear()
  var month=date.getMonth()+1
  var day=date.getDate()
  var h = date.getHours()
  h=h < 10 ? ('0' + h) : h
  var minute = date.getMinutes()
  minute = minute < 10 ? ('0' + minute) : minute
  var time=h+":"+minute
  var taskDate=''+year+'-'+month+'-'+day
  console.log("今天是"+taskDate+" "+time)
  
  const wxContext = cloud.getWXContext()  
  const _openid = wxContext.OPENID ||'oohGZ5DxurJBq1wiJq8Pk6STt1Ms'
  const dbResult = await db.collection('subscribeMessage').where({
    _openid:_openid,
    date:taskDate,
    time:time
    // _openid
  }).get()

  


  const {data} =dbResult
  console.log(dbResult)
  try {


    var dtime=data[0].date+" "+data[0].time
    
      const result = await cloud.openapi.subscribeMessage.send(
        {
          "touser": _openid,
          "template_id": 'JfUaLD9OPbWBJiyCJuehYc5SUQfuK7yWqLYE0idCr4w',
          "page": '/pages/index/index',
          "data": {
          "thing5": {
            "value":data[0].name
          },
          "date4": {
            "value":dtime
          },
          
        },
       
      }   
      )
    
    console.log(result)
    return {result, data,time}
  } catch (err) {
    console.log(err)
    return {err,data}
  }
}