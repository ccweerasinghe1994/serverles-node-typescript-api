import {GetParameterCommand, PutParameterCommand, PutParameterCommandInput, SSMClient} from '@aws-sdk/client-ssm';
import {GetParameterRequest} from '@aws-sdk/client-ssm/dist-types/models/models_1';

const STAGE = process.env.STAGE || 'dev';
const DATABASE_URL_SSM_PARAM = `/serverless-node-js-api/${STAGE}/database-url`;
export const getDatabaseUrl = async () => {
	try {
		const client = new SSMClient({
			region: 'us-east-1'
		});

		const parameterRequest: GetParameterRequest = {
			Name: DATABASE_URL_SSM_PARAM,
			WithDecryption: true
		};
		const command = new GetParameterCommand(parameterRequest);
		const result = await client.send(command);
		return result.Parameter?.Value;

	} catch (error) {
		console.error('Error fetching database URL from SSM: ');
		throw error;
	}

};

export const putDatabaseUrl = async (stage: string, databaseUrl: string) => {
	const paramStage = stage ? stage : 'dev';

	if (paramStage === 'prod') {
		return;
	}

	const databaseUrlParam = `/serverless-node-js-api/${paramStage}/database-url`;
	try {
		const client = new SSMClient({
			region: 'us-east-1'
		});

		const parameterData: PutParameterCommandInput = {
			Name: databaseUrlParam,
			Value: databaseUrl,
			Type: 'SecureString',
			Overwrite: true
		};
		const command = new PutParameterCommand(parameterData);
		return await client.send(command);
	} catch (error) {
		console.error('Error putting database URL to SSM: ', error);
		throw error;
	}
};
