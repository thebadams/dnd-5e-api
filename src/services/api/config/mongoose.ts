const url = 'mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false';

const mongooseConfig = {
	url,
	dbName: '5eAPI'
};

export default mongooseConfig;


