import express, {Express, Request, Response} from 'express';
import serverless from 'serverless-http';
import {tasksRoute} from './routes/tasks/tasks.route';


const app: Express = express();
app.get('/', (_req: Request, res: Response) => {
	return res.status(200).json({
		message: 'Hello from root11!',
	});
});

app.use('/tasks', tasksRoute);

app.get('/path', (_req: Request, res: Response) => {
	return res.status(200).json({
		message: 'Hello from path!',
	});
});

app.use((_req: Request, res: Response) => {
	return res.status(404).json({
		error: 'Not Found',
	});
});

module.exports = {
	handler: serverless(app)
};