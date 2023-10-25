import express from 'express';
import * as bodyParser from 'body-parser';
import 'express-async-errors';
import routes from './routes';
import errorMiddleware from './errors/globalErrorHandler';

const app = express();
app.use(bodyParser.json());
routes(app);
app.use(errorMiddleware);

export default app;
