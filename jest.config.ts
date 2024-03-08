import type {Config} from '@jest/types';

const Config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true
};

export default Config;