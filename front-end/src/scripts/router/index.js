import SMERouter from 'sme-router'
import layoutController from '../controllers/layout'
import loginController from '../controllers/login'
import registerController from '../controllers/register'
import homeController from '../controllers/home'
import * as goods from '../controllers/goods'
const router = new SMERouter('page-wrapper')
let login=(req,res,next)=>{
    console.log(res)
    loginController.render()
   
}
let register=(req,res,next)=>{
    registerController.render()
}
let layout=(req,res,next)=>{
    layoutController.render()
}

router.route('/',layout)
router.route('/login',login)
router.route('/register',register)
router.route('/goods',goods.list)
router.route('/goods_add',goods.add)
router.route('/goods_update',goods.update)
router.route('*', (req, res, next) => {
      res.redirect('/')
})

export default router