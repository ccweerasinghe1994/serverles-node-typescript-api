import {GetParameterCommand, PutParameterCommand, SSMClient} from '@aws-sdk/client-ssm';
import {getDatabaseUrl, putDatabaseUrl} from '../../lib/secrets';
import {mocked} from 'jest-mock';

jest.mock('@aws-sdk/client-ssm');
type SSMClient = {
    send: jest.Mock;
};
const mockedSSMClient = mocked<SSMClient>(SSMClient);
const mockedGetParameterCommand = mocked(GetParameterCommand);
const mockedPutParameterCommand = mocked(PutParameterCommand);

describe('Secrets', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	describe('getDatabaseUrl', () => {
		it('should return the database URL when the request is successful', async () => {
			const expectedUrl = 'test-url';
			// mockedSSMClient.prototype.send.mockResolvedValueOnce({Parameter: {Value: expectedUrl}});
			mockedSSMClient.prototype.send.mockResolvedValueOnce({Parameter: {Value: expectedUrl}});
			const result = await getDatabaseUrl();

			expect(result).toEqual(expectedUrl);
			expect(mockedSSMClient).toBeCalledTimes(1);
			expect(mockedGetParameterCommand).toBeCalledTimes(1);
		});

		it('should throw an error when the request fails', async () => {
			const expectedError = new Error('Test error');
			mockedSSMClient.prototype.send.mockRejectedValueOnce(expectedError);

			await expect(getDatabaseUrl()).rejects.toThrow(expectedError);
			expect(mockedSSMClient).toBeCalledTimes(1);
			expect(mockedGetParameterCommand).toBeCalledTimes(1);
		});
	});

	describe('putDatabaseUrl', () => {
		it('should not put the database URL when the stage is prod', async () => {
			await putDatabaseUrl('prod', 'test-url');

			expect(mockedSSMClient).not.toBeCalled();
			expect(mockedPutParameterCommand).not.toBeCalled();
		});

		it('should put the database URL when the stage is not prod', async () => {
			mockedSSMClient.prototype.send.mockResolvedValueOnce({});

			await putDatabaseUrl('dev', 'test-url');

			expect(mockedSSMClient).toBeCalledTimes(1);
			expect(mockedPutParameterCommand).toBeCalledTimes(1);
		});

		it('should throw an error when the put request fails', async () => {
			const expectedError = new Error('Test error');
			mockedSSMClient.prototype.send.mockRejectedValueOnce(expectedError);

			await expect(putDatabaseUrl('dev', 'test-url')).rejects.toThrow(expectedError);
			expect(mockedSSMClient).toBeCalledTimes(1);
			expect(mockedPutParameterCommand).toBeCalledTimes(1);
		});
	});
});