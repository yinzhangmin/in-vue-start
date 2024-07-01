<template>
	<el-breadcrumb separator="/">
		<transition-group name="list">
			<el-breadcrumb-item key="a" :to="{ path: '/' }">系统首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in list" :to="{ path: item.path }" :key="index">
				{{ item.meta.title }}
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>
<script lang="ts" setup>
const router = useRouter();
const list = computed(() => {
	var result = router.currentRoute.value.matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false);
	return result;
});
</script>

<style scoped>
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>
