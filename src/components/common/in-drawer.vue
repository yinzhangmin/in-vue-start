<template>
	<div>
		<el-drawer class="user-drawer" :wrapperClosable="wrapperClosable" :with-header="withHeader"
			:append-to-body="appendToBody" :destroy-on-close="destroyOnClose" :size='size' :title="title"
			v-model="isVisible" :direction="direction" :before-close="handleClose">
			<slot />
		</el-drawer>
	</div>
</template>

<script>
	export default {
		props: {
			modelValue: [Boolean],
			direction: {
				type: String,
				default: 'ltr'
			},
			title: {
				type: String,
				default: ''
			},
			destroyOnClose: {
				type: Boolean,
				default: true
			},
			size: {
				type: String,
				default: ''
			},
			withHeader: {
				type: Boolean,
				default: true
			},
			appendToBody: {
				type: Boolean,
				default: false
			},
			wrapperClosable: {
				type: Boolean,
				default: true
			}
		},
		model: {
			prop: 'modelValue',
			event: 'update:modelValue'
		},
		watch: {
			modelValue(val) {
				this.isVisible = val;
			}
		},
		created() {

		},
		data() {
			return {
				isVisible: false
			}
		},
		methods: {
			handleClose(done) {
				this.$emit("update:modelValue", false);
				done();
			}
		}
	}
</script>

<style>
	.user-drawer {
		
	}

	.user-drawer .el-drawer.ltr {
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	.user-drawer .el-drawer.rtl {
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
	}

	.user-drawer .el-drawer__header {
		margin-bottom: 20px;
		padding: 20px 20px 10px 10px;
		font-size: 24px;
		color: #000;
	}

	.user-drawer .el-drawer__header span {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.user-drawer .el-drawer__close-btn {
		font-size: 24px;
	}

	.user-drawer .el-drawer__close-btn:hover {
		color: #0052cc;
		border-radius: 7px;
		background-color: #eee;
	}

	/**非必要请勿调整改样式 **/
	.user-form {
		padding: 5px 5px 5px 5px;
		width: 100%;
		height: calc(100vh - 150px);
		box-sizing: border-box;
		overflow: hidden;
	}

	.user-form>.form-content {
		height: 100%;
		width: 100%;
		border-radius: 7px;
		padding: 5px;
		background-color: #fff;
		box-sizing: border-box;
	}

	.user-form>.form-content .el-form-item--medium .el-form-item__label {
		height: auto;
		display: block;
		padding: 0;
		line-height: 24px;
		font-weight: normal;
		color: #333;
		font-size: 16px;
	}

	.user-form>.form-content .el-form-item {
		margin-bottom: 0;
	}

	.user-form .el-input--medium .el-input__inner {
		height: 30px;
		border: 2px solid #eee;
		background-color: #eee;
		padding: 0 0 0 4px;
		font-size: 18px;
		color: #0052cc;
		border-radius: 7px;
	}
</style>