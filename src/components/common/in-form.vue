<template>
	<div class="user-form">
		<el-form :setParams="setParams" ref="userform" :show-message="true" :inline-message="true" :status-icon="true"
			:rules="rules" label-position="top" label-width="80px" :model="formData">
			<div class="form-content">
				<div class="form-content-title" v-if="filterForm && filterShowType=='popover'">
					<div><i class='fa-duotone fa-bars-filter' style='margin-right: 5px;'></i>高级查询</div>
					<div><i class="el-icon-close" @click="closeForm" /></div>
				</div>
				<slot />
			</div>
			<div class="user-form-fns">
				<div>
					<el-button v-if="filterForm" @click="refresh" slot="reference" icon="fa-duotone fa-rotate"
						type="danger">
						重置
					</el-button>
				</div>
				<div>
					<!-- 自定义按钮 -->
					<template>
						<el-popconfirm v-for="item in fns" v-if="item.popConfirm" confirm-button-text='确定'
							cancel-button-text='不用了' icon="el-icon-info" icon-color="red"
							@confirm="item.click(item,that)" :title=" item.popTitle!=null? item.popTitle: '您确定要执行该操作吗?'"
							style="margin:0 10px; 0 0">
							<el-button v-if="item.show == null||item.show" slot="reference" :loading="item.loading"
								:icon="(item.icon ==null || item.icon=='')?'el-icon-check':item.icon" type="primary">
								{{ (item.showName==null? item.name:item.showName())}}
							</el-button>
						</el-popconfirm>
					</template>

					<template>
						<el-button v-for="item in fns" @click="item.click(item,that)"
							v-if="!item.popConfirm && (item.show == null||item.show)" :style="item.style"
							:loading="item.loading"
							:icon="(item.icon ==null || item.icon=='')?'el-icon-check':item.icon" type="primary">
							{{ (item.showName==null? item.name:item.showName())}}
						</el-button>
					</template>
					<!-- 确定按钮/搜索模式(搜索按钮) -->
					<template v-if="!filterForm">
						<el-popconfirm confirm-button-text='确定' cancel-button-text='不用了' icon="el-icon-info"
							icon-color="red" @confirm="submitForm" title="您确定要执行该操作吗?" style="margin-right:10px;">
							<el-button :loading="loading" v-if="(showSubmit && api !=null) || filterForm"
								:icon="submitBtnIcon" type="primary" slot="reference">
								{{ submitBtnName}}
							</el-button>
						</el-popconfirm>
					</template>

					<!-- 搜索模式(搜索按钮) -->
					<template v-if="filterForm">
						<el-button :loading="loading" v-if="(showSubmit && api !=null) || filterForm"
							:icon="filterForm ? 'fa-duotone fa-magnifying-glass' :submitBtnIcon" type="primary"
							@click="submitForm">
							搜索
						</el-button>
					</template>

					<!-- 关闭按钮 -->
					<el-button @click="closeForm" icon="el-icon-close" slot="reference">关闭</el-button>
				</div>
			</div>
		</el-form>
	</div>
</template>

<script>
	import * as $api from '@/utils/http/default'
	export default {
		props: {
			api: [String],
			mainForm: [Object],
			debuger: {
				type: Boolean,
				default: false
			},
			value: {
				type: Object,
				default: () => {}
			},
			title: {
				type: String,
				default: ""
			},
			rules: {
				type: Object,
				default: () => {}
			},
			showSubmit: {
				type: Boolean,
				default: true
			},
			submitBtnName: {
				type: String,
				default: "确定"
			},
			submitBtnIcon: {
				type: String,
				default: "el-icon-check"
			},
			fns: {
				type: Array,
				default: () => []
			},
			showRulesInfo: {
				type: Boolean,
				default: false
			},
			setParams: {
				type: Function,
				default: () => null
			},
			filterForm: {
				type: Boolean,
				default: false
			},
			filterShowType: {
				type: String,
				default: ""
			}
		},
		data() {
			var that = this;
			return {
				loading: false,
				formData: this.value,
				that: that
			};
		},
		methods: {
			refresh() {
				var that = this;
				that.$refs.userform.resetFields();
				that.refreshTable();
				that.closeForm();
			},
			refreshTable() {
				var that = this;
				if (that.mainForm != null && that.mainForm.$refs.table != null && that.mainForm.$refs.table.reload != null)
					that.mainForm.$refs.table.reload();
				else if (that.mainForm != null && that.mainForm.$refs.singleTable != null)
					that.mainForm.reload();
			},
			submit(error, success, flag) {
				var that = this;
				if (flag)
					that.setParams != null && that.setParams(that);
				$api.http(that.api, that.formData, () => {
					error && error();
				}).then((data) => {
					success && success();
					if (data != undefined && data != null) {
						that.refreshTable();
						that.$notify({
							position: 'bottom-right',
							title: '系统提示',
							message: '操作成功',
							type: 'success'
						});
						this.$emit('onSuccess', that, data);
						that.closeForm();
					}
				});
			},
			submitForm() {
				var that = this;
				this.$emit('onSubmit', that);
				switch (that.filterForm) {
					case false:
						that.$refs.userform.validate((valid) => {
							if (valid) {
								that.loading = true;
								that.submit(() => {
									that.loading = false;
								}, () => {
									that.loading = false;
								}, true);
							} else {
								if (that.showRulesInfo) {
									that.$notify({
										position: 'bottom-right',
										title: '系统提示',
										message: '请检查必填项*',
										type: 'warning'
									});
								}
							}
						});
						break;
					case true:
						that.refreshTable();
						that.closeForm();
						break
				}
			},
			closeForm() {
				if (this.$parent.$parent.closeDrawer != null)
					this.$parent.$parent.closeDrawer();
				if (this.$parent.$parent.doClose != null)
					this.$parent.$parent.doClose();
			}
		}
	};
</script>
<style>
	.user-form {
		padding: 5px 5px 5px 5px;
		width: 100%;
		height: calc(100vh - 80px);
		box-sizing: border-box;
		overflow: hidden;
	}

	.user-form ::placeholder {
		font-size: 14px;
		color: #999;
	}

	.user-form .form-content {
		height: calc(100vh - 150px);
		width: 100%;
		border-radius: 7px;
		padding: 5px;
		background-color: #fff;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: auto;
	}

	.user-form .el-form-item__label {
		height: auto;
		display: block;
		padding: 0;
		line-height: 24px;
		font-weight: normal;
		color: #000;
		font-size: 16px;
	}

	.user-form .el-form-item {
		margin-bottom: 0px;
	}

	.user-form .el-tabs__content .el-form-item {
		margin-bottom: 5px;
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

	.user-form .el-textarea__inner {
		padding: 4px;
		background-color: #eee;
		border: 2px solid #eee;
		color: #0052cc;
		font-size: 16px;
		min-height: 25px;
		height: 25px;
	}

	.user-form .el-radio-button__inner {
		color: #0052cc;
	}

	.user-form-fns {
		padding: 12px 0 10px 0;
		display: flex;
		justify-content: space-between;
		justify-items: flex-start;
	}

	.user-form .el-upload-list--picture .el-upload-list__item {
		border: 1px solid #eee;
	}

	.user-form .el-upload-list--picture .el-upload-list__item-status-label {
		background-color: #0052cc;
	}

	.user-form .el-icon-upload-success {
		color: #0052cc;
	}

	.user-form .el-upload-list__item-name {
		color: #0052cc;
		font-size: 22px;
		overflow: hidden;
		width: 62%;
	}

	.user-form .el-upload-list .el-icon-close {
		font-size: 22px;
	}

	.user-form .el-upload-list__item .el-icon-close {
		top: 8px;
	}

	.user-form .el-upload-list__item-status-label {
		font-size: 22px;
	}

	.user-form .el-select.el-select--medium {
		width: 100%;
	}

	.user-form .el-input.el-input--medium.el-input--suffix {
		line-height: 28px;
		background-color: #eee;
		border-radius: 7px;
	}

	.user-form .el-form-item__content .el-select.el-input.is-focus.el-input__inner {
		border-color: #eee;
	}

	.el-select.el-input.is-focus.el-input__inner {
		color: #0052cc;
		font-size: 16px;
	}

	.user-form .el-tag.el-tag--info {
		color: #0052cc;
		font-size: 14px;
	}

	.user-form .el-tag.el-tag--info .el-tag__close {
		width: 15px;
		height: 15px;
	}

	.user-form .el-form-item__error {
		font-size: 14px;
		margin-left: 2px;
		color: #D9007A;
	}

	.user-form .el-form-item--medium .el-form-item__content {
		line-height: 25px;
	}

	.user-form .el-textarea__inner {
		min-height: 30px !important;
	}

	.user-form .el-form-item.is-error .el-input__validateIcon {
		display: none;
	}

	.user-form .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before,
	.el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before {
		color: #0052cc;
	}

	.user-form .el-form-item.is-error .el-input__inner,
	.el-form-item.is-error .el-input__inner:focus,
	.el-form-item.is-error .el-textarea__inner,
	.el-form-item.is-error .el-textarea__inner:focus {
		border: none;
	}

	.user-form .el-radio-button--medium .el-radio-button__inner {
		font-size: 14px;
		padding: 10px 12px;
	}

	.user-form .el-tabs__item {
		font-size: 16px;
	}

	.user-form .el-date-editor.el-input,
	.user-form .el-date-editor.el-input__inner {
		width: 100%;
	}

	.user-form .el-cascader--medium {
		width: 100%;
	}

	.user-form .el-cascader .el-input.is-focus .el-input__inner {
		border: none;
	}

	.user-form .el-cascader .el-input .el-input__inner:focus {
		border: none;
	}

	.user-form .form-content-title {
		font-size: 18px;
		padding: 0 0 10px 0;
		display: flex;
		justify-content: space-between;
		color: #000;
	}

	.user-form .form-content-title .el-icon-close {
		cursor: pointer;
		font-size: 18px;
		padding: 5px;
	}

	.user-form .form-content-title .el-icon-close:hover {
		color: #0052cc;
		background-color: #eee;
		border-radius: 7px;
	}
</style>