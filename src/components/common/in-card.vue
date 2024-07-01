<template>
	<div class="user-card">
		<div class="title">
			<div class="i1">
				<div class="icon"><i class="fa-duotone fa-grid-horizontal" style="color: #0052cc"></i></div>
				<div class="text">{{ title }}</div>
			</div>
		</div>
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		showTitle: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {};
	},
	computed: {},
	created() {},
	methods: {}
};
</script>

<style>
.user-card {
	.title {
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		> .i2 {
			display: flex;
			height: 100%;
			align-items: center;
		}
		
		> .i1 {
			display: flex;
			height: 100%;
			align-items: center;
			
			> .text {
				margin-right: 5px;
				margin-left: 5px;
				font-size: 18px;
			}
			
			> .icon {
				margin-right: 5px;
				margin-left: 10px;
			}
		}
	}
}
</style>
