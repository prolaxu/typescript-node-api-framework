import { Router } from 'express';

const router = Router();
const crud =(path:string,controller:any,allowed:string[]=['get','index','create','edit','delete'])=>{
    if(allowed.includes('get')){
        router.get(`/${path}s`, (res,req)=>controller.get(res,req));
    }
    if(allowed.includes('index')){
        router.get(`/${path}/:id`, (res,req)=>controller.index(res,req));
    }
    if(allowed.includes('create')){
        router.post(`/${path}`, (res,req)=>controller.create(res,req));
    }
    if(allowed.includes('edit')){
        router.put(`/${path}/:id`, (res,req)=>controller.update(res,req));
    }
    if(allowed.includes('delete')){
        router.delete(`/${path}/:id`, (res,req)=>controller.delete(res,req));
    }
    return router;
}
export default crud;