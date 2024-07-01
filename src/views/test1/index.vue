<template>
	<in-page>
		<div style="overflow: auto; height: 100%">
			<div class="group">
				{{ store.routers }}
			</div>
			<div class="group">
				<div>路由信息(route)：</div>
				{{ route }}
			</div>
			<div class="group">
				<div>路由信息(router)：</div>
				{{ router }}
			</div>
			<div class="group">
				<div>配置信息(store)：</div>
				{{ store }}
			</div>
			<div class="group">
				<div>组件：</div>
				<HelloWorld />
			</div>
		</div>
	</in-page>
</template>

<script setup>
import defaultLayout from '@/layout/default/index.vue';

let route = useRoute();
let router = useRouter();
let  store=  useStore();
const show2 = ref(false);

let routers = reactive({ router: null });

const changeRouter = () => {
	router.addRoute('a', {
		path: '/ccccc',
		name: 'ccccc',
		component: () => import('@/views/test/index.vue'),
		meta: {
			title: 'ccccc',
			breadcrumb: true,
			requiresAuth: true
		}
	});
	useStore.routers = router.getRoutes();
};
const resolvePath = (routePath) => {
	router.push(routePath);
};
</script>
<style scoped>
.group {
	border: 1px solid red;
	padding: 10px;
	border-radius: 7px;
	margin-bottom: 10px;
}
</style>
