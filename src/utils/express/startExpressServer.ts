import { Express } from 'express';

const startExpressServer = (app: Express, PORT: number) => {
	app.listen(PORT, () => {
		console.log(`Express Instance Started At PORT: ${PORT}`);
	});
};

export default startExpressServer;