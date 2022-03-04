import {Router} from 'express';
const router=Router();

router.get('/', function(req, res) {
   res.send('<h1>Welcome to the Web</h1>');
});

// Export the router
const web : Router = router;
export default web ;