import registerView from '../views/register.art'
import httpModel from '../models/http'
class Register { 
  render(){     
    let html =registerView()  
    $('#root').html(html)      
    $('#regis').on('click',this.handleSubmit.bind(this))
    $('#verfiy').on('click',this.validatechange)
  }


  async handleSubmit() {   
    let data = $('.form-horizontal').serialize()   
    let result = await httpModel.get({
      url: '/api/users/signup',
      type:'POST',
      data
    })
    this.handleSubmitSucc(result)
  }
  handleSubmitSucc(result) {
    console.log(result.ret)
    if(result.ret){
      location.hash='/login'
    
    }else{
      alert(result.data.message)
      location.hash='register'
     
    }
  }  
  validatechange(e){
   
    console.log(e)
    let src=$(this).attr('src')
    $(this).attr('src',src+'?'+e.timeStamp) 
    
    
   
  }

 
 
}
export default new Register()