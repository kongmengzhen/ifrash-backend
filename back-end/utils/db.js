const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/ifrash-admin',{ useUnifiedTopology: true, useNewUrlParser: true })
const Users=mongoose.model('users',{
    username:String,
    password:String
})
const Goods=mongoose.model('goods',{
    goodsLogo:String,
    goods_home:String,
    goods_name:String,
    goods_sale_price:String,
    goods_price:String,
    createTime: String
})
module.exports={
    Users,
    Goods
}