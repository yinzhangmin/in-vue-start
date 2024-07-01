<template>
	<div class="left-side" :class="{ active: store.config.ui.side.left.active }">
		<div class="logo-wrapper">
			<i class="icon-log fa-duotone fa-brightness-low fa-rotate-180 fa-spin" style="color: rgb(255, 255, 255); font-size: 2rem"></i>
			<a href="#/" class="sidebar-logo-link">
				<h1 data-v-7c163a6f="" class="side-title">运营中心管理平台</h1>
			</a>
		</div>
		<div class="menu-wrapper">
			<defaultMenu />
		</div>
	</div>
</template>

<script lang="ts" setup>
import menu from './menu.vue';
const store = useStore();
var defaultMenu = menu;
</script>
<style lang="scss">
@import 'index.scss';
</style>
