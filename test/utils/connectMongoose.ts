import {createConnection, ConnectOptions} from 'mongoose';

const connectMongoose = (url: string, options?: ConnectOptions) => {
const connection =	createConnection(url, options);
return connection;
};

export default connectMongoose;