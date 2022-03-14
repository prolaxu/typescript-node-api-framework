import env from '../core/utills/env';
import { connect } from 'mongoose';
import api from '../routes/api';
import web from '../routes/web';
import express,{ Request,Response} from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import * as http from "http";
import * as socketio from "socket.io";
import path from 'path';
import NotificationService from './services/NotificationService';
class Kernel{
    app = express();
    server = http.createServer(this.app);
    io = new socketio.Server(this.server,{
        cors: { origin: "*" }
    });
    constructor(){
        this.init();
    }
    private init(){
        this.init_middlewares();
        this.init_routes();
        this.init_services();
        this.init_database();
        this.init_server();
    }
    private init_routes(){
        this.app.use('/', express.static(path.join(__dirname, '..','..', 'public')))
        this.app.use('/', web);
        this.app.use('/api', api);
        this.init_404();
    }
    private init_services(){
        this.io
        .use(function(socket:any, next){
            if (socket.handshake.query && socket.handshake.query.token){
              jwt.verify(socket.handshake.query.token, env.key, function(err:any, decoded:any) {
                if (err) return next(new Error('Authentication error'));
                socket.decoded = decoded;
                next();
              });
            }
            else {
              next(new Error('Authentication error'));
            }    
          })
          .on('connection', (socket:any) => { 
                new NotificationService(this.io,socket);
        });
    }
    private init_middlewares(){
        //cors
        this.app.use(cors({
            origin:"*",
        }));
        this.app.use(express.json());
    }
    private init_404(){
        this.app.all('*',function(req,res){
            if(req.headers.accept==="application/json"){
                res.status(404).json({
                  success: false,
                  message: 'Not Found',
                  status_code: 404
                });
            }else{
                res.status(404).send('404 - Not Found');
            }
        });
    }
    private async init_database(){
        const db=env.database.data;
        await connect(`mongodb://${db.host}:${db.port}/${db.dbname}`);
    }
    private init_server(){
        this.server.listen(env.server.port, () => {
            console.log(`Listening : http://${env.server.host}:${env.server.port}`);
        });
    }
}
export default Kernel;