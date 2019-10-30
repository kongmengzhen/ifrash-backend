var express = require('express');
var router = express.Router();
var {signup,hasUsername,signin,isSignin,loginout} = require('../controllers/users')
// 使用中间件，来控制访问的顺序。 在入库之前进行一个判断数据库是否已经存在。
router.post('/signup', hasUsername,signup);
router.post('/signin', signin);
router.get('/isSignin', isSignin);
router.get('/loginout',loginout);




module.exports = router;
