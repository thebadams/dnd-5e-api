import app, { PORT } from './config/server';
import mongooseConfig from './config/mongoose';
import startExpressServer from '../../utils/express/startExpressServer';
import connectMongoose from '../../utils/mongoose/connectMongoose';

startExpressServer(app, PORT);
connectMongoose(mongooseConfig.url, { dbName: mongooseConfig.dbName });