var express = require('express');
var router = express.Router();
var session = require('express-session');
const svgCaptcha = require('svg-captcha');
/* var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser()); */
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: {maxAge: 60000}}));

/**
 * 获取svg验证码
 */
router.get('/verfiy2.gif', function(req, res, next) {
  // res.render('index', { title: 'Express' });  
  const cap =  svgCaptcha.create({
    size: 4,
    noise: 2,
    color:true
  })
  req.session.token = cap.text.toLowerCase()
  res.cookie('captcha', req.session.token); 
  res.setHeader('Content-Type', 'image/svg+xml');
  // 把验证码存到session里 为了临时存储这个数据 在登录ajax时 去验证比较
  // console.log(cap.text)
  // console.log(req.session.token)
  res.type('svg')
  res.end(cap.data)

});


module.exports = router;
