import { Router } from 'express';
const crud =(path:string,router:Router,controller:any)=>{
    router.get(`/${path}s`, (res,req)=>controller.get(res,req));
    router.get(`/${path}/:id`, (res,req)=>controller.index(res,req));
    router.post(`/${path}`, (res,req)=>controller.create(res,req));
    router.put(`/${path}/:id`, (res,req)=>controller.update(res,req));
    router.delete(`/${path}/:id`, (res,req)=>controller.delete(res,req));

    return router;
}
export default crud;