// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init( {
  env: 'data-3g27hwj2149b13bc'
})
const db = cloud.database()
// const app=getApp()

// 云函数入口函数
exports.main = async (event, context) => {
  // const {OPENID} = cloud.getWXContext();

  //获取系统时间，注意云函数时区问题，时区差为8小时；
  var date=new Date(Date.now() + (8 * 60 * 60 * 1000))
  date.toLocaleDateString("zh-cn" ,{timeZone:"Asia/Shanghai"})
  var year=date.getFullYear()
  var month=date.getMonth()+1
  var day=date.getDate()
  day=day < 10 ? ('0' + day) : day
  var h = date.getHours()
  h=h < 10 ? ('0' + h) : h
  var minute = date.getMinutes()
  minute = minute < 10 ? ('0' + minute) : minute
  var time=h+":"+minute
  var taskDate=''+year+'-'+month+'-'+day
  const wxContext = cloud.getWXContext()
  const _openid=event.openid
  //if(switch==1)不用判断日期
  
  const dbResult = await db.collection('subscribeMessage').where({
    _openid:_openid,
    // date:taskDate,
    time:time
  }).get()
  const {data} =dbResult
  console.log(dbResult)
  console.log(data.length)
  for(var i =0; i<data.length;i++ ){
    if (data[i].switch==0 && data[i].date==taskDate){
      console.log(data[i].switch)
  try {
    var dtime=data[i].date+" "+data[i].time
      console.log(dtime)
      var result = await cloud.openapi.subscribeMessage.send(
        {
          "touser":data[i]._openid,
          "template_id": 'JfUaLD9OPbWBJiyCJuehYc5SUQfuK7yWqLYE0idCr4w',
          "page": '/pages/add/add',
          "data": {
          "thing5": {
            "value":data[i].name
          },
          "date4": {
            "value":dtime
          }
        },
      }   
      )
    console.log(result)
    
  } catch (err) {
    console.log(err)
    //return {err,data}
  }
}
     else if(data[i].switch==1){    
      console.log(data[i].switch)
  try {
    var dtime1=data[i].time
    console.log(dtime1)
      var result = await cloud.openapi.subscribeMessage.send(
        {
          "touser":data[i]._openid,
          "template_id": 'JfUaLD9OPbWBJiyCJuehYc5SUQfuK7yWqLYE0idCr4w',
          "page": '/pages/add/add',
          "data": {
          "thing5": {
            "value":data[i].name
          },
          "date4": {
            "value":dtime1
          }
        },
      }   
      )
    console.log(result)
   
  } catch (err) {
    console.log(err)
    //return {err,data}
  }

    }
    else{
      console.log("3")
    }
}
}