import { connect, ConnectOptions } from 'mongoose';

const connectMongoose = async (url: string, options? : ConnectOptions) => {
	await connect(url, options).then(() => options.dbName ? console.log(`Database: ${options.dbName} Has Been Connected`) : console.log('Database Has Been Connected'));
};

export default connectMongoose;


