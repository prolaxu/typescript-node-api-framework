import Controller from './Controller';
import {Request,Response} from "express"; 

class HomeController  extends Controller {
    public index(req: Request, res: Response){
        this.sendResponse(res,
            {
                page:"Index Pages",
                paths:["users","posts"]
        },"Welcome to the API");
    }
}
export default HomeController;