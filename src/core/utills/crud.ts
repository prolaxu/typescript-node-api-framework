import { Router } from 'express';

const router = Router();
const crud =(path:string,controller:any,middleware:any,allowed:string[]=['get','index','create','edit','delete'])=>{
    if(allowed.includes('get')){
        if(middleware){
            router.get(`/${path}s`,middleware,(req,res)=>controller.get(req,res));
        }else{
            router.get(`/${path}s`, (res,req)=>controller.get(res,req));
        }
    }
    if(allowed.includes('index')){
        if(middleware){
            router.get(`/${path}/:id`,middleware,(req,res)=>controller.index(req,res));
        }else{
            router.get(`/${path}/:id`, (res,req)=>controller.index(res,req));
        }
    }
    if(allowed.includes('create')){
        if(middleware){
            router.post(`/${path}`,middleware,(req,res)=>controller.create(req,res));
        }else{
            router.post(`/${path}`, (res,req)=>controller.create(res,req));
        }
    }
    if(allowed.includes('edit')){
        if(middleware){
            router.put(`/${path}/:id`,middleware,(req,res)=>controller.update(req,res));
        }else{
            router.put(`/${path}/:id`, (res,req)=>controller.update(res,req));
        }
    }
    if(allowed.includes('delete')){
        if(middleware){
            router.delete(`/${path}/:id`,middleware,(req,res)=>controller.delete(req,res));
        }else{
            router.delete(`/${path}/:id`, (res,req)=>controller.delete(res,req));
        }
    }
    return router;
}
export default crud;