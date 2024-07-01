/**
 * 调用接口获取菜单权限
 * @returns Promise<any[]>
 */
const get = async (): Promise<any[]> => {
	const store = apiStore();
	return await store.api.menu.get();
};

const createRouter = (item: any, router: any) => {
	const route = {
		path: item.Url ?? "/",
		component: () => import('@/views/test1/index.vue'),
		meta: {
			icon: "fa-duotone fa-house-chimney-medical",
			title: item.Name,
			breadcrumb: true,
			hidden: false,
			requiresAuth: true,
			expanded: false
		},
		children: item.Children.length > 0 ? (_ => creater(item.Children, router))() : []
	};
	router.addRoute("defalut-layout", route)
	return route;
};

const creater = (list: any[], router: any): any[] => {
	let arry = [];
	for (let item of list) {
		arry.push(createRouter(item, router));
	}
	return arry;
};

export default async () => {
	const store = useStore();
	const router = useRouter();
	const routers = await creater((await get()), router);
	store.routers = routers;
};