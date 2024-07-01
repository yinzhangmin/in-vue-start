import config from '@/config';
import user from './modules/authorize';
import routers from './modules/routers';
const useStore = defineStore('useStore', {
	persist: true,
	state: () => {
		return {
			user,
			routers,
			config
		};
	}
});

export default useStore;
