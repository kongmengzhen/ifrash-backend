import SMERouter from 'sme-router'
import layoutController from '../controllers/layout'
import loginController from '../controllers/login'
import registerController from '../controllers/register'
const router = new SMERouter('root')
router.route('/',layoutController.render)
router.route('/login',loginController.render)
router.route('/register',registerController.rende)

router.route('*', (req, res, next) => {
//   res.redirect('/')
console.log(1)

})

export default router