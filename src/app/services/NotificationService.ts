import socketio from 'socket.io';

import jwt from 'jsonwebtoken';
import env from '../../core/utills/env';

class NotificationService {
    io:socketio.Server;
    socket:any;
    constructor(io:socketio.Server,socket:any){
        this.io = io;
        this.socket = socket;
        this.listen();
    }
    private listen(){ 
        this.socket.on('notifications', (data:object) =>{
            this.send(data);
        });
    }
    public send(data:any){
        const user:any = jwt.verify(this.socket.handshake.query.token, env.key);
        if(user){
            this.io.emit('notifications', data);
        }
    }
}
export default NotificationService;