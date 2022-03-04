import Controller from './Controller';
import {Request,Response} from "express"; 
import PostModel from '../models/PostModel';
import {authcheck} from '../middleware/authuser';

class PostController  extends Controller {
    public async get(req: Request, res: Response){
        const user:any=authcheck(req,res);
        const posts =  await PostModel.find({user_id:user.id});
        this.sendResponse(res,posts,"Posts fatched successfully.");
    }
    public async index(req: Request, res: Response){
        const user:any=authcheck(req,res);
        const post =  await PostModel.findById(req.params.id).find({user_id:user.id});
        if(post.length>0){
            this.sendResponse(res,post,"Post fatched successfully.");
        }else{
            this.sendError(res,"Post not found.");
        }
    }
    public async create(req: Request, res: Response){
        const {title,body} = req.body;
        const user:any= authcheck(req,res);
        const post =  await PostModel.create({
            title,
            body,
            user_id:user.id
        });
        this.sendResponse(res,post,"Post created successfully.");
    }
    public async update(req: Request, res: Response){
        const user:any=authcheck(req,res);
        const post = await PostModel.findOne({_id:req.params.id,user_id:user.id});
        if(post){
            const {title,body} = req.body;
            post.title = title;
            post.body = body;
            await post.save();
            this.sendResponse(res,post,"Post updated successfully.");
        }else{
            this.sendError(res,"Post not found.");
        }
    }
    public async delete(req: Request, res: Response){
        const user:any=authcheck(req,res);
        const post =  await PostModel.findByIdAndRemove(req.params.id);
        this.sendResponse(res,post,"Post deleted successfully.");
    }
}
export default PostController;