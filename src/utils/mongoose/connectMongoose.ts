import { connect, ConnectOptions } from 'mongoose';

const connectMongoose = async (url: string, options? : ConnectOptions) => {
	await connect(url, options).then(() => console.log('Database Has Been Connected'));
};

export default connectMongoose;


