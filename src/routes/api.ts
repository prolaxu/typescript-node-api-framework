import {Router} from 'express';
import HomeController from '../app/controller/HomeController';
import PostController from '../app/controller/PostController';
import AuthController from '../app/controller/AuthController';
import crud from '../core/utills/crud';
import {authuser} from '../app/middleware/authuser';


const router = Router();
const home = new HomeController();
const auth = new AuthController();

router.get('/', (res,req)=>home.index(res,req));
// route for post crud
router.use('/',authuser,crud('post',new PostController));

// Api Auth
router.post('/login', (req,res)=>auth.login(req,res));
router.post('/register', (req,res)=>auth.register(req,res));
router.get('/encrypt',authuser, (req,res)=>auth.encrypt(req,res));

// Export the router
const  api:Router = router;
export default api;