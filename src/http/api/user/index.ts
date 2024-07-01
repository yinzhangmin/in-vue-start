import * as http from '@/http/index';
export default {
	name: 'user',
	apis: {
		get: async () => {
			return await http.post('/api/after/process/execute', {}, () => {});
		},
		list: async () => {
			return await http.post('/api/after/process/execute', {}, () => {});
		}
	}
};
