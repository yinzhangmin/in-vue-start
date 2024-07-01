<template>
	<div class="right-menu-item hover-effect">
		<div class="icon-fn" @click="toHome">
			<i class="fa-duotone fa-house-chimney-user"></i>
		</div>
	</div>
	<div class="right-menu-item hover-effect">
		<el-badge value="99" :is-dot="false" :max="99" style="margin-right: 10px; z-index: 99" type="primary">
			<div class="icon-fn" @click="toMessage">
				<i class="fa-duotone fa-comment-dots"></i>
			</div>
		</el-badge>
	</div>

	<div class="right-menu-item hover-effect">
		<el-dropdown>
			<div class="icon-fn">{{ store.user.name }}</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="1">
						<span style="display:block;">个人信息</span>
					</el-dropdown-item>
					<el-dropdown-item command="2">
						<span style="display:block;">修改密码</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>


	<div class="right-menu-item hover-effect">
		<el-dropdown>
			<div class="avatar">
				<i class="fa-duotone fa-user-doctor user" />
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item>系统管理员</el-dropdown-item>
					<el-dropdown-item>部门经理</el-dropdown-item>
					<el-dropdown-item>部门主管</el-dropdown-item>
					<el-dropdown-item>普通员工</el-dropdown-item>
					<el-dropdown-item divided @click="logout">
						<span>退出系统</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script setup>
const store = useStore();
const router = useRouter();
const logout = () => {
	router.push("login");
}
const toHome = () => {
	router.push("/");
};
</script>

<style lang="scss" scoped>
@import '../index.scss';
</style>
