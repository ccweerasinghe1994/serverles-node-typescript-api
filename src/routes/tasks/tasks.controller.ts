import {RequestHandler} from 'express';
import {getAllTasks} from '../../models/tasks.module';

type Task = {
    id: number;
    name: string;
    description: string;
}

type ResponseBody = {
    data?: Task[];
    error?: string;
}

type THttpGetAllTasks = RequestHandler<unknown, ResponseBody, unknown, unknown>;

export const httpGetAllTasks: THttpGetAllTasks = (_req, res) => {
	getAllTasks().then((tasks) => {
		res.status(200).json({
			data: tasks,
			error: undefined
		});
	}).catch((error) => {
		console.error('Error fetching tasks: ', error);
		res.status(500).json({error: 'Error fetching tasks'});
	});
};


