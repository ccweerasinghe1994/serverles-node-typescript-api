// tsx src/cli/dbSecretUpdate.ts stage databaseUrl
import 'dotenv/config';
import {putDatabaseUrl} from '../lib/secrets';
// import {fileURLToPath} from 'url';
// import {dirname} from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// console.log('__filename', __filename);
// console.log('__dirname', __dirname);
// console.log('process.argv', process.argv);
// if (process.argv[1] === __filename) {
// 	console.log('This is the main module');
// } else {
// 	console.log('This is not the main module');
// }
const args = process.argv.slice(2); // renamed 'arguments' to 'args'
if (args.length !== 2) {
	console.error('please add stage and databaseUrl as arguments');
	process.exit(1);
}

if (require.main === module) {
	const stage = args[0]; // use 'args' instead of 'arguments'
	const databaseUrl = args[1]; // use 'args' instead of 'arguments'
	console.log(`stage: ${stage}, databaseUrl: ${databaseUrl}`);
	console.log('✅✅✅process.env.AWS_REGION', process?.env?.AWS_REGION);

	putDatabaseUrl(stage, databaseUrl).then(value => {
		console.log(value);
		process.exit(0);
	}).catch((error) => {
		console.error(error);
		process.exit(1);
	});
}