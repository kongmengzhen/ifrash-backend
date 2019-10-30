import loginView from '../views/login.art'
import httpModel from '../models/http'
class Login { 
  render() {  
    console.log(this)     
    let html =loginView()  
    $('#root').html(html)  
    // 当点击登录按钮时候 进行登录操作 
    $('#login').on('click',this.handleLogin.bind(this))
  }

 
 async handleLogin(){
    let data = $('.form-horizontal').serialize()
    // console.log(data)//username=15779078428&password=123
    let result= await httpModel.get({
      url: '/api/users/signin',
      type:'POST',
      data
    })
   console.log(result)
    this.handleLoginSucc(result)  
  }
  handleLoginSucc(result) {
    if(result.data.user){
      location.hash='/layout'
      $('#useroption').html(result.data.user)
      $('#register,#signup').css({'display':'none'})
     $('#loginout,#changeuser').css({'display':'block'})
    
    }
  }
}
 export default new Login()
