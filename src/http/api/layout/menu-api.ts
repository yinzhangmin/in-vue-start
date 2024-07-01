import * as http from '@/http';

export default {
	name: 'menu',
	apis: {
		get: async () => {
			return await http.http('/api/menu/get', {}, () => {});
		}
	}
};
