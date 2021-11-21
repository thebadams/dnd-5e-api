import {MongoMemoryServer} from 'mongodb-memory-server';

const startMongoInstance = async () => {
	const instance = await MongoMemoryServer.create();
	return instance;
};

export default startMongoInstance;