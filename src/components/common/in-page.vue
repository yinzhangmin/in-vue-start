<template>
	<div :class="className" class="page">
		<div class="content">
			<slot />
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	className: {
		type: String,
		default: ''
	}
});
</script>

<style scoped>
/**非必要请勿调整改样式 **/
.page {
	width: 100%;
	height: calc(100vh - 50px);
	box-sizing: border-box;
	overflow: hidden;

	> .content {
		height: 100%;
		width: 100%;
		border-radius: 7px;
		padding: 5px;
		background-color: #fff;
		box-sizing: border-box;
		overflow: hidden;
	}
}
</style>
