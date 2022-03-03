import {Router} from 'express';
import HomeController from '../app/controller/HomeController';
import PostController from '../app/controller/PostController';
import crud from '../core/utills/crud';

const router = Router();
const home = new HomeController();

router.get('/', (res,req)=>home.index(res,req));
// route for post crud
router.use('/', crud('post',router,new PostController));

// Export the router
const  api:Router = router;
export default api;