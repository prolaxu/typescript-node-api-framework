import jwt from 'jsonwebtoken';
import env from '../../core/utills/env';
import BaseController from '../../core/classes/BaseController';
import {Response,NextFunction} from 'express';


const authcheck=(req: any, res: Response)=>{
    const controller = new BaseController();
    try {     
        const user = jwt.verify(req.token, env.key);
        return user;
    } catch (error:any) {
        controller.sendError(res,400,"Unauthorized access denied");
    }
    return false;
}
const authuser=(req:any, res: Response, next: NextFunction)=>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.status(403).json({
        success:false,
        message:'unauthorized access denied',
        status_code:403
      });
    }
}

export {
    authcheck,
    authuser
}