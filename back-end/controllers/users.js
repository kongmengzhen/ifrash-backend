const userModel=require('../models/users')
const tools=require('../utils/tools')

const authMiddleware=require('../middleware/auth')
const signup=async function (req, res, next) {
    // console.log(req.body)能拿到前端请求的数据 接下来将做入库的操作。
    res.set('Content-Type','application/json;charset=utf-8')
   let {username,password}=req.body 
  let hash=await tools.hash(password)
   let result =await userModel.save({
       username,
       password:hash
   })  
   console.log(result)
   if(result){
    res.render('succ', {   
        "data": JSON.stringify({
          message:"用户注册成功"
        })
      }) 
   }else{
     res.end('pk')
    /* res.render('fail', {   
        "data": JSON.stringify({
          message:"用户名重复"
        })
      })  */
   }
    //只有插入数据库成功才能判断数据的成功注册 因此 需要采取异步操作
   
  }

  // 判断验证码是否正确 

//   判断数据库是否已经又相同的username
const hasUsername=async function(req,res,next){ 
    res.set('Content-Type','application/json;charset=utf-8') 
    let{username,validate}=req.body
    let valDate= req.session.token.toLowerCase()
    /* let valDate= req.session.token
   console.log(valDate); */
  
    let result=await userModel.findone({
        username
    })
    if(result){     
        res.render('fail', {   
            "data": JSON.stringify({
              message:"用户名重复"
            })
          }) 
    }else if(validate.toLowerCase()!==valDate){//validate.toLowerCase()!==
      res.render('fail', {   
        "data": JSON.stringify({
          message:"验证码有误"
        })
      }) 
    }else{
        next()
    }
}

// 当注册完成 接下来就是登录逻辑了 获取请求的数据 去数据库比对账号密码
const signin=async function(req,res,next){
  res.set('Content-Type','application/json;charset=utf-8')
    // console.log(req.body) 
    let {username,password}=req.body
    // 先去数据库看有没有这条数据
    console.log(username)
    let result=await userModel.findone({
      username
  })
  if(result){   
    let compareRes=await tools.compare(password,result.password)
    // console.log(compareRes)//这个结果是true  还是false
    if(compareRes){
      req.session.username = username
      res.render('succ', {   
        "data": JSON.stringify({
          message:"用户登录成功",
          user: req.session.username
        })
      }) 
    }else{
      res.render('fail', {   
        "data": JSON.stringify({
          message:"用户名或者密码错误"
        })
      }) 
    }
  }else{
    res.render('fail', {   
      "data": JSON.stringify({
        message:"用户名不存在 请注册"
      })
    }) 
  }

}


const isSignin = authMiddleware

const loginout=function(req,res,next){
  req.session = null
res.json({
  code:1,
  msg:"安全退出成功！"
})


}

  module.exports={
      signup,
      hasUsername,
      signin,
      isSignin,
      loginout
  }