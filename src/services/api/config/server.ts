import express from 'express';
import setUpBodyParser from '../../../utils/express/setupBodyParser';
import setupURLEncoded from '../../../utils/express/setupURLEncoded';

export const PORT = 3001;
const app = express();

setUpBodyParser(app);
setupURLEncoded(app, { extended: true });

export default app;

