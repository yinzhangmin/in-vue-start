import defaultLayout from '@/layout/default/index.vue';

/**
 * 获取布局
 */
const getLayoutComponent = () => {
	return defaultLayout;
};

/**
 * 静态路由配置
 */
export default [
	{
		path: '/layout',
		name: 'defalut-layout',
		component: getLayoutComponent(),
		meta: {
			root: true,
			icon: ""
		},
		children: [
			{
				path: '/home',
				redirect: '/',
				meta: {
					hidden: true,
					icon: ""
				}
			},
			{
				path: '/',
				component: () => import('@/views/home/index.vue'),
				meta: {
					title: '系统首页',
					icon: 'fa-duotone fa-house-chimney-medical',
					breadcrumb: true,
					requiresAuth: true,
					transition: 'slide-left'
				}
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录',
			hidden: true
		}
	}
];
