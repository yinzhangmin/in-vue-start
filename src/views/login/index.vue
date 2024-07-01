<template>
	<div class="login content" v-loading="formData.loading">
		<div class="login-content">
			<div class="form">
				<div class="title">系统登录</div>
				<div class="info">
					<div class="t2">运营中心管理平台</div>
					<div style=" padding: 0px 10px; font-size: 14px">推荐使用Chrome浏览器使用本系统</div>
				</div>
				<div class="i">
					<div class="title">登录账号</div>
					<el-input class="in-input" ref="account" v-model="formData.account" placeholder="请输入您的登录账号">
						<template #prefix>
							<i class="fa-duotone fa-clipboard-user" />
						</template>
					</el-input>
				</div>
				<div class="i">
					<div class="title">登录密码</div>
					<el-input class="in-input" @keyup.enter.native="handleLogin('')" ref="passWord"
						v-model="formData.passWord" type="password" placeholder="请输入您的登录密码">
						<template #prefix>
							<i class="fa-duotone fa-key-skeleton" />
						</template>
					</el-input>
				</div>
				<div class="i button">
					<el-button :loading="formData.loading" type="primary"
						style="width: 100%; height: 40px; margin-bottom: 30px"
						@click.native.prevent="handleLogin('')">进入系统</el-button>
				</div>
				<div class="i version">
					<div style="text-align: center">{{ store.config.version.company }}</div>
					<div style="text-align: center; padding: 10px 0">{{ store.config.version.value }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import cryp from '@/utils/cryp';
const route = useRoute();
const router = useRouter();
let store = useStore();

const passWord = ref();
const account = ref();

const formData = reactive({
	account: 'admin',
	passWord: 'admin',
	passwordType: 'password',
	loading: false
});
const vaildata = () => {
	if (formData.account == '') {
		ElNotification({
			title: '系统提醒',
			message: '请输入您的登录账号',
			type: 'warning',
			position: 'bottom-left'
		});
		account.value.focus();
		return false;
	}
	if (formData.passWord == '') {
		ElNotification({
			title: '系统提醒',
			message: '请输入您的登录密码',
			type: 'warning',
			position: 'bottom-left'
		});
		passWord.value.focus();
		return false;
	}
	return true;
};
const handleLogin = (token, vail) => {
	if (vail || vaildata()) {
		formData.loading = true;
		store.user.token = '123456';
		// username: cryp.encryptFunc(formData.account),
		// password: cryp.encryptFunc(formData.passWord),
		router.push({
			path: route.query.redirect || '/'
		});
	}
};
</script>
<style lang="scss">
@import 'index.scss';
</style>