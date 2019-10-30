const goodsModel=require('../models/goods')
const moment=require('moment')
const findAll=async function(req,res,next){
    res.set('Content-Type', 'application/json; charset=utf-8')
    let result=await goodsModel.findAll()
    // console.log(result)
    res.render('succ', {
      data: JSON.stringify({
        list: [result]
      })
    })
}

// findOne
const findOne=async function(req,res,next){
  res.set('Content-Type', 'application/json; charset=utf-8') 
  let id=req.query.id
  let result=await goodsModel.findOne(id)
  // console.log(result)
  if(result){
    res.render('succ', {
      data: JSON.stringify(result)
    })
  }else{
    res.render('fail', {
      data: JSON.stringify(result)
    })
  }
 
}


const goods_add=async function(req,res,next){
  res.set('Content-Type', 'application/json; charset=utf-8')
  console.log() 
  let data=req.body
  data.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
  data.goodsLogo=req.filename
  let result= await goodsModel.save(data)
  if(result){
    res.render('succ',{
    "data":JSON.stringify({
      message:"数据插入成功"
    })
    })
  }else{
    res.render('fail',{
      "data":JSON.stringify({
        message:"数据插入失败"
      })
      })
  }

}

// 更新修改
const update= async function(req,res,next){
  console.log(req.body)
  let data=req.body
  let result=await goodsModel.update(data)
  // console.log(result)
  if(result){
    res.render('succ',{
      "data":JSON.stringify({
        message:"数据修改成功"
      })
      })
  }else{
    res.render('fail',{
      "data":JSON.stringify({
        message:"数据修改失败"
      })
      })
  }
}

// 删除数据 。根据id  删除当前的id
const remove=async function(req,res,next){
let id=req.body.id
console.log(id)
let result=await goodsModel.remove(id)
if (result) {
  res.render('succ', {
    data: JSON.stringify({
      message: '数据删除成功.'
    })
  })
} else {
  res.render('fail', {
    data: JSON.stringify({
      message: '数据删除失败.'
    })
  })
}
}

// 搜索  根据关键字进行搜索
const search=async function(req,res,next){
  let { keywords } = req.body 
  let result = await goodsModel.search(keywords)
  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        list: result
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        list: []
      })
    })
  }

}

module.exports={
    findAll,
    goods_add,
    findOne,
    update,
    remove,
    search
}