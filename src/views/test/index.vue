<template>
	<in-page>
		<div style="overflow: auto; height: 100%">
			<div class="group">
				<div>组件：</div>
				<HelloWorld />
			</div>
			<div class="group">
				<div>操作(Function)：</div>
				<el-button @click="changeRouter">修改路由</el-button>
				<el-button @click="resolvePath('/ccccc')">跳转路由</el-button>
			</div>
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
				<div>动画：</div>
				<div>
					<el-button @click="show2 = !show2">Click Me</el-button>

					<div style="display: flex; margin-top: 20px; height: 100px">
						<transition name="el-zoom-in-center">
							<div v-show="show2" class="transition-box">.el-zoom-in-center</div>
						</transition>

						<transition name="el-zoom-in-top">
							<div v-show="show2" class="transition-box">.el-zoom-in-top</div>
						</transition>

						<transition name="el-zoom-in-bottom">
							<div v-show="show2" class="transition-box">.el-zoom-in-bottom</div>
						</transition>
					</div>
				</div>
			</div>
		</div>
	</in-page>
</template>

<script setup>
import defaultLayout from '@/layout/default/index.vue';

let route = useRoute();
let router = useRouter();
let store = useStore();
const show2 = ref(false);

let routers = reactive({ router: null });

const changeRouter = () => {
	router.addRoute('a', {
		path: '/ccccc',
		component: () => import('@/views/test1/index.vue'),
		meta: {
			title: 'ccccc',
			breadcrumb: true,
			requiresAuth: true
		}
	});
	store.routers = router.getRoutes();
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
