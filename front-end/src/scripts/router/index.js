import SMERouter from 'sme-router'
import layoutController from '../controllers/layout'
import loginController from '../controllers/login'
import registerController from '../controllers/register'
const router = new SMERouter('root')
let login=(req,res,next)=>{
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
/* router.route('*', (req, res, next) => {
    //   res.redirect('/')
})
 */
export default router