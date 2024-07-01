/**
 * 错误页面路由配置
 */
export default [
	{
		path: '/403',
		name: '403',
		component: () => import('@/views/error/403.vue'),
		meta: {
			title: '403页面',
			hidden: true
		}
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/error/404.vue'),
		meta: {
			title: '404页面',
			hidden: true
		}
	},
	{
		path: '/500',
		name: '500',
		component: () => import('@/views/error/500.vue'),
		meta: {
			title: '500页面',
			hidden: true
		}
	},
	{
		path: '/:pathMatch(.*)',
		redirect: '/404',
		hidden: true
	}
];
