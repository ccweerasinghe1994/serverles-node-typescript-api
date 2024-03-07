import {Router} from 'express';
import {httpGetAllTasks} from './tasks.controller';


export const tasksRoute = Router();


tasksRoute.get('/', httpGetAllTasks);

