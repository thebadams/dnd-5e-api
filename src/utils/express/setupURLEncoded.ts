import { Express, urlencoded } from 'express';
import bodyParser from 'body-parser';

const setupURLEncoded = (app: Express, options: bodyParser.OptionsUrlencoded) => {
	app.use(urlencoded(options));
};

export default setupURLEncoded;
