<template>
	<div class="side-container">
		<el-scrollbar class="scrollbar-side">
			<div class="in-nav">
				<div class="item" v-for="(item, index) in list" :class="{ expanded: item.expanded }">
					<div class="title" @click="resolvePath(item)">
						<span class="icon">
							<i :class="item.meta.icon != null ? item.meta.icon : ''"></i>
						</span>
						<span class="text">{{ item.meta.title }}</span>
						<span class="fn" v-if="item.children != null && item.children.length > 0">
							<i class="fa-thin fa-chevron-up"></i>
						</span>
					</div>
					<el-collapse-transition v-if="item.children != null && item.children.length > 0">
						<div class="sub" v-if="item.expanded">
							<div class="item" v-for="(sub, index) in item.children">
								<div class="title" @click="resolvePath(sub)">
									<span class="icon">
										<i class="in-icon fa-duotone fa-memo sub-el-icon"></i>
									</span>
									<span class="text">{{ sub.meta.title }}</span>
								</div>
							</div>
						</div>
					</el-collapse-transition>
				</div>
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup>
const router = useRouter();
const store = useStore();
const list = store.routers;

const resolvePath = (item) => {
	if (item.children != null && item.children.length > 0) {
		item.expanded = !item.expanded;
	} else {
		router.push(item.path);
	}
};
</script>

<style lang="scss" scoped>
.side-container {
	height: calc(100% - 55px);

	.scrollbar-side {
		height: 100%;
	}
}
</style>
