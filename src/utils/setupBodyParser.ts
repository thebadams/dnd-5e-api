import {Express, json } from 'express';

const setUpBodyParser = (app: Express) => {
	app.use(json());
};

export default setUpBodyParser;
