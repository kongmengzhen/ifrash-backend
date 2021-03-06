import layoutView from '../views/layout.art'
import httpModel from '../models/http'
class Layout { 
 
    render() {
    location.hash="layout"
    let html = layoutView()    
    $('#root').html(html)    
    $('#signup').click(function(){
      location.hash="login"    
    })
    $('#register').click(function(){
      location.hash="register"    
    })
    $('#loginout').click(async function(){
      let result= await httpModel.get({
        url:'/api/users/loginout'
      })     
      if(result.code){
        location.reload()
      }     
})
$('#changeuser').click(async function(){
  location.hash="login"  
})
     
    

  }
}
export default new Layout()