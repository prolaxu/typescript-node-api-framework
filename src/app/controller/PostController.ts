import Controller from './Controller';
import {Request,Response} from "express"; 
import PostModel from '../models/PostModel';

class PostController  extends Controller {

    public async get(req: Request, res: Response){
        const posts =  await PostModel.find({});
        this.sendResponse(res,posts,"Posts fatched successfully.");
    }
    public async index(req: Request, res: Response){
        const post =  await PostModel.findById(req.params.id);
        this.sendResponse(res,post,"Post fatched successfully.");
    }
    public async createPost(req: Request, res: Response){
        const post =  await PostModel.create(req.body);
        this.sendResponse(res,post,"Post created successfully.");
    }
    public async updatePost(req: Request, res: Response){
        const post =  await PostModel.findByIdAndUpdate(req.params.id,req.body);
        this.sendResponse(res,post,"Post updated successfully.");
    }
    public async deletePost(req: Request, res: Response){
        const post =  await PostModel.findByIdAndRemove(req.params.id);
        this.sendResponse(res,post,"Post deleted successfully.");
    }
}
export default PostController;