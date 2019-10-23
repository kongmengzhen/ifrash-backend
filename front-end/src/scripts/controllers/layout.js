import layoutView from '../views/layout.art'
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
  }
}
export default new Layout()