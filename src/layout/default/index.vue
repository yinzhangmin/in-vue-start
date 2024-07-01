<template>
	<div class="app">
		<defaultSide />
		<div class="wrapper">
			<defaultHeader />
			<div class="main-container">
				<router-view v-slot="{ Component, route }">
					<transition :name="route.meta.transition || 'slide-fade'">
						<keep-alive>
							<component :is="Component" />
						</keep-alive>
					</transition>
				</router-view>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import header from './header/index.vue';
import side from './side/index.vue';
const defaultHeader = header;
const defaultSide = side;
</script>

<style scoped lang="scss">

.app {
	display: flex;
	flex-grow: 1;
	overflow: hidden;
	height: 100%;
	width: 100%;
	box-sizing: border-box;

	.wrapper {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		overflow: hidden;
		box-sizing: border-box;
	}

	.main-container {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		overflow: hidden;
		box-sizing: border-box;
		margin-top: 5px;
		height: 10px;
		margin-bottom: 5px;
	}
}
</style>
