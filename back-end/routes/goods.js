var express = require('express');
var router = express.Router();
const goods=require('../controllers/goods')
const loadmiddleware=require('../middleware/loading')
// router.get('/findAll',goods.findAll);
// router.post('/goods_add',goods.goods_add)
router.route("/")
.get(goods.findAll)
.post(loadmiddleware,goods.goods_add)
.patch(goods.update)
.delete(goods.remove)
router.get('/findOne',goods.findOne)
router.post('/search',goods.search)
// router.get('/search',)

/*
以上写法为 router.route("/")
.get()
.post
 */
module.exports = router