import express,{
    Response,
    Request,
    ErrorRequestHandler,
} from 'express';
import { connect } from 'mongoose';
import api from './routes/api';
import web from './routes/web';
import env from './core/utills/env';

//init database 
const db=env.database.data;
(async ()=>await connect(`mongodb://${db.host}:${db.port}/${db.dbname}`))();

//inti server 
const app = express();
app.use('/api', api);
app.use('/', web);
app.use((res:Response) => {
  res.status(500).send('Something broke!')
})
app.listen(3000, () => {
  console.log('Server started on port 3000');
});