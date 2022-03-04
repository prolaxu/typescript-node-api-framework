import {Request,Response} from 'express';
import Controller from './Controller';
import UserModel from '../models/UserModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import env from '../../core/utills/env';
import {authcheck} from '../middleware/authuser';

class AuthController extends Controller{
    public async login(req: Request, res: Response){
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            this.sendError(res,400,'User not found');
        }else{
            if(bcrypt.compareSync(password,user.password)){
                const token = jwt.sign(this.user_response(user), env.key, {
                    expiresIn: 86400 // 24 hours
                });
                const fields={
                    user:this.user_response(user),
                    token
                }
                this.sendResponse(res,{fields},'Login success');
            }else{
                this.sendError(res,400,'Password is incorrect');
            }
        }
    }
    public async register(req: Request, res: Response){
        const {name,email,password,conform_password} = req.body;
        if (password === conform_password) {
            const check_user = await UserModel.findOne({email});
            if(check_user){
                this.sendError(res,400,'Email already used.');
            }else{
                try {
                    const user = new UserModel({
                        name,
                        email,
                        password:bcrypt.hashSync(password),
                        role:'user'
                    });
                    await user.save();
                    this.sendResponse(res,this.user_response(user),'User created successfully.');
                } catch (error:any) {
                    this.sendError(res,400,error.message);
                }
            }
        }else{
            this.sendError(res,400,'Passwords not matched.');
        }
    }
    public encrypt(req:any, res: Response){
        authcheck(req,res);
        this.sendResponse(res,{
            string:req.body.string,
            hash:bcrypt.hashSync(req.body.string)
        },'Encrypt success ');
    }
    private user_response(user:any){
        return {
            id:user.id,
            name:user.name,
            email:user.email,
        }
    }
}
export default AuthController;