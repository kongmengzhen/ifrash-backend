import goodsView from '../views/goods.art'
import goodsaddView from '../views/goods_add.art'
import goodsupdateView from '../views/goods_update.art'
import httpModel from '../models/http'
// 在这个页面进行增删改查的操作。
function _handleAddClick(res){
  $('#btn-add').on('click',()=>{  
    res.go('/goods_add')
  }) 
}

function _handleUpdateClick(res){  
  $('.btn-update').on('click',function(e){    
    let id=$(this).attr('data-id')   
    res.go('/goods_update',{id})
  })
}

function _handleRemoveClick(res){ 
  $('.btn-delete').on('click',async function(){
 
    let id=$(this).attr('data-id')       
    let result=await httpModel.get({
      url:'/api/goods',
      data:{id},
      type:"delete"
    })  
    if (result.ret) {
    
     res.go(('/goods?r=' + (new Date().getTime())))
   
    }
  })
}

function _handleSearchClick(res){  
  $('body').on('keyup', '#search', async (e) => {
    if (e.keyCode === 13) {
     let keywords=$(e.target).val()
     let result= await httpModel.get({
      url:'/api/goods/search',
      data:{keywords},     
      type:"post"
     })    
     if (result.ret) {
      res.render(goodsView({
        list: result.data.list
      }))
    } else {
      res.go('/goods')
    }
    }
  })
}

export const list = async (req, res, next) => {
  let result = await httpModel.get({
    url: '/api/goods'
  })                                                                                                             
  if(result.ret) {
    let list=result.data.list[0]   
    res.render(goodsView({list}))
    _handleAddClick(res)  
  } else {
    res.go('/')
  }
  _handleUpdateClick(res)
  _handleRemoveClick(res)
  _handleSearchClick(res)
}
export const add = async (req, res, next) => {  
    let html =goodsaddView() 
    $('#page-wrapper').html(html)  
 
  /*   $('#add_goods').on('click',async function(){
      let data=$('#addgoodsform').serialize()
    console.log(data)
      let result = await httpModel.get({
        url: '/api/goods/',
        data,
        type:"POST"
      }) 
      console.log(result)
    
    }) */
    $('#addgoodsform').ajaxForm(()=>{
      console.log(0)
    })

   
}

export const update = async (req, res, next) => { 
  let id=req.body.id  
  let result = await httpModel.get({
    url: '/api/goods/findOne', 
    data:{id},   
  })   
  res.render(goodsupdateView({
    item:result.data
  })) 
  //  console.log($('#goodsedit'))
   $('#goodsedit').on('click',async ()=>{
    let $form=$('#editgoodsform')
    let data = $form.serialize()
    console.log(id)
    console.log(data)
    let result=await httpModel.get({
      url:'/api/goods',
      data: data + '&id=' + id,
      type:'PATCH'
    }) 
   
   })
  
//  删除

}