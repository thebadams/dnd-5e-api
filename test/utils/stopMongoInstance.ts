import {MongoMemoryServer} from 'mongodb-memory-server';

const stopMongoInstance = async (instance: MongoMemoryServer) => {
	await instance.stop();
};

export default stopMongoInstance;