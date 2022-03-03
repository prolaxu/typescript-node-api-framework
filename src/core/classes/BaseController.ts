import { Response } from 'express';

class BaseController{
    public sendResponse(res: Response, data: any,message:string =""):boolean{
        try{
            res.json({
                status: "success",
                message: message,
                data: data,
                status_code: 200
            });
            return true;
        }
        catch(error){
            return false;
        }
    }
    public sendError(res: Response, error: any,message:string =""){
        try{
            res.status(400).json({
                status: "error",
                message: message,
                error: error,
                status_code: 400
            });
            return true;
        }
        catch(error){
            return false;
        }
       
    }
    
}
export default BaseController;