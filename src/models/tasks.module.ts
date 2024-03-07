import {getDatabaseUrl} from '../lib/secrets';

export const getAllTasks = async () => {

	const dbUrl = await getDatabaseUrl();
	console.log('Database URL: ', dbUrl);

	return [
		{
			id: 1,
			name: 'Task 1',
			description: 'This is task 1'
		},
		{
			id: 2,
			name: 'Task 2',
			description: 'This is task 2'
		},
		{
			id: 3,
			name: 'Task 3',
			description: 'This is task 3'
		}
	];

};