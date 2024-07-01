import { createRouter, createWebHashHistory } from 'vue-router';
import nprogress from 'nprogress';
import staticRouter from './modules/static-router';
import errorRouter from './modules/error-router';
import dynamicRoute from "@/router/modules/dynamic-router"; 

nprogress.configure({
	showSpinner: true
});

const creater = () => {
	return createRouter({
		history: createWebHashHistory(),
		routes: [...staticRouter, ...errorRouter],
		strict: false,
		scrollBehavior: () => ({
			left: 0,
			top: 0
		})
	});
};

const router = creater();
const setTitle = (to: any, _from: any) => {
	const title = import.meta.env.VITE_GLOB_APP_TITLE;
	document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;
};

/**
 * 验证
 */
const vaild = (to: any, _from: any, next: any): Boolean => {
	var store = useStore();
	if (to.path !== store.config.urls.login) {
		if (store.user.token === '') {
			next({ name: 'login', query: { redirect: to.path } });
			return false;
		}
	}
	return true;
};

router.beforeEach(async (to, from, next) => {
	// 开启进度条
	nprogress.start();
	// 验证
	if (vaild(to, from, next)) {
		// 动态加载菜单
		dynamicRoute();
		// 设置标题
		setTitle(to, from);
		return next();
	}
});

router.afterEach(() => {
	nprogress.done();
});

router.onError((error) => {
	console.warn('路由错误', error.message);
});

export const resetRouter = () => {};

export default router;
