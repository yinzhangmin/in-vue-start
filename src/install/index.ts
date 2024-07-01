// 导入系统路由配置
import useRouter from '@/router/index';
// 导入指令
import directives from "./directive";
// 导入API
import useApi from '@/http/api';
// 导入动态数字组件（需要切换element-ui-plus的组件）
import animateNumber from 'animated-number-vue3';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


export default {
	install: (app: any) => {
		app.use(useRouter);
		app.use(createPinia().use(piniaPluginPersistedstate));
		app.use(animateNumber);
		app.use(directives);
		app.use(useApi);
		
		// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
		//   app.component(key, component)
		// }
	}
};
