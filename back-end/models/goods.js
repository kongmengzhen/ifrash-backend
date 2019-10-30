const {Goods}=require('../utils/db')

const save=(data)=>{
let goods = new Goods(data)   
return goods.save()
}

const findAll=async ()=>{
    return await Goods.find({}).sort({_id:-1})
}

const findOne=async (id)=>{
    return await Goods.findById(id)
}

// 修改 updata
const update=async (data)=>{
    return await Goods.findByIdAndUpdate(data.id,data)
}
const remove=async (id)=>{
    return await Goods.findByIdAndDelete(id)
}

const search=async(keywords)=>{
// 需要使用正则 即关键字作为正则 然后作为查询的条件
let reg=new RegExp(keywords,'gi')
return await Goods.find({}).or([{goods_home:reg},{goods_name:reg}])

}
module.exports={
    save,
    findAll,
    findOne,
    update,
    remove,
    search
}