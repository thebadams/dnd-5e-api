import {MongoMemoryServer} from 'mongodb-memory-server';
const createMongoURI = (instance: MongoMemoryServer) => {
	const uri = instance.getUri();
	return uri;

};

export default createMongoURI;