import * as http from '@/http/index';
export default {
	name: 'common',
	apis: {
		get: async () => {
			return await http.post('/bpm-api/api/after/process/execute', {}, () => {});
		},
		list: async () => {
			return await http.post('/bpm-api/api/after/process/execute', {}, () => {});
		}
	}
};
