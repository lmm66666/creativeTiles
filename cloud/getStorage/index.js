// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "tile-server-l2751",
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  console.log("openid: " + openid)
  const res = await db.collection("storage").where({id: _.eq(openid)}).get({})
  console.log(res.data)
  if (res.data.length > 0){
    return {
      data: res.data[0]
    }
  }
  else{
    return {
      data: []
    }
  }
}