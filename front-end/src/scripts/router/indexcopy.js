import layoutController from '../controllers/layout'
import loginController from '../controllers/login'
import registerController from '../controllers/register'


class Router{
    constructor () {      
        this.render() 
        layoutController.render()       
    }  

    renderDom(hash){        
        let pageControllers = {          
            loginController,
            layoutController,
            registerController
          }      
          pageControllers[hash+ 'Controller'].render()      
    }
    render(){      
        window.addEventListener('hashchange',this.hashchangeHandle.bind(this))
        window.addEventListener('load',this.loadHandle.bind(this))      
    }
    hashchangeHandle(){    
        let hash=location.hash.substr(1)       
        this.renderDom(hash)
    }
    loadHandle(){
        let hash=location.hash.substr(1)       
        this.renderDom(hash)
    }
  
}
new Router()
