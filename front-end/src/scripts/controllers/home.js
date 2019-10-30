import httpModel from '../models/http'
class Home{
    constructor(){       
        this.render()
        this.type = ''
        this.isSignin = false
        this.username = ''
    }
  async  render(){
      await this.auth();
      console.log()
      if(this.isSignin){
        $('#useroption').html( this.username)
        $('#register,#signup').css({'display':'none'})
        $('#loginout,#changeuser').css({'display':'block'})
      }
    }
    async auth() {
        let result =await httpModel.get({
          url:'/api/users/isSignin'
        })
        let username = result.data.username
        this.isSignin = username ? true : false
        this.username = username        
      }    
}
export default new Home()