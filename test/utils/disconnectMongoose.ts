import mongoose from 'mongoose'


const disconnectMongoose = async () => {
	await mongoose.disconnect()
};

export default disconnectMongoose;