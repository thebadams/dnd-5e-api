import { MongoMemoryServer } from 'mongodb-memory-server';
import {Mongoose} from 'mongoose'
import startMongoInstance from '../utils/startMongoInstance';
import createMongoURI from '../utils/createMongoURI';
import connectMongoose from '../utils/connectMongoose';
import disconnectMongoose from '../utils/disconnectMongoose';
import stopMongoInstance from '../utils/stopMongoInstance';
import {stringify} from 'flatted';

let instance: MongoMemoryServer;
let Spell: any
beforeAll(async () => {
	instance = await startMongoInstance();
	const uri: string = createMongoURI(instance);
	const connection =  connectMongoose(uri, {dbName: 'test'});
	console.log(connection);
	global.MONGOCONNECTION = connection;

});
export default Spell;
afterAll(async () => {
	await disconnectMongoose();
	await stopMongoInstance(instance);

});
