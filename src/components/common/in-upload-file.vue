<template>
	<div class="in-upload-file">
		<div v-if="readonly===true" class="upload-file-label">
			<div class='item'>
				<ul class="el-upload-list el-upload-list--text">
					<div v-for="item in list" class="file-item">
						<div v-if="showCategoryName" style="padding: 0 5px;">{{item.categoryName}}</div>
						<li tabindex="0" class="el-upload-list__item is-success">
							<div :title="item.name" style="font-size: 18px;" class="el-upload-list__item-name"
								@click="viewFile(view + item.fileId)">
								<i class="fa-duotone fa-file-lines"
									style='margin:0 5px 0 0;color:#0052cc' />{{item.name}}
							</div>
							<div class="el-upload-list__item-status-label-fn" v-if="showTime">
								<span class='text'>{{item.time}}</span>
								<span class='text'>·</span>
								<span class='text'>{{item.userName}}</span>
							</div>
						</li>
						<slot name="Attributes" />
					</div>
				</ul>
			</div>
		</div>

		<div v-if="readonly===true && list.length==0 " class="upload-file-label">
			<div>-</div>
		</div>

		<div v-if="readonly===false">
			<el-upload :action="action" :data="data" :on-preview="handlePreview" :on-remove="handleRemove"
				:before-remove="beforeRemove" :limit="limit" :on-exceed="handleExceed" :file-list="list"
				:multiple="multiple" :on-success="onSuccess" :before-upload="beforeUpload">
				<div slot="tip" class="el-upload__tip"></div>
				<div style="display: flex;align-items:center">
					<el-button size="small" type="primary">选择文件</el-button>
					<span style="margin-left: 10px;">{{tip}}</span>
				</div>
			</el-upload>
		</div>
		<in-drawer v-model="showViewFileForm" :wrapperClosable="true" :withHeader="false" :appendToBody="true"
			size="85%" title="附件预览" direction="ltr">
			<viewFileForm :src="viewFileUrl" :mainForm="this" />
		</in-drawer>
	</div>
</template>

<script>
	const baseUrl = process.env.VUE_APP_BASE_API;
	import * as $api from '@/utils/http/default'
	import viewFileForm from '@/views/components/common/viewFile.vue'
	export default {
		components: {
			viewFileForm
		},
		props: {
			limit: {
				type: Number,
				default: 1
			},
			modelValue: [Array, Object],
			showTime: {
				type: Boolean,
				default: false
			},
			multiple: {
				type: Boolean,
				default: true
			},
			category: {
				type: String,
				default: ''
			},
			tip: {
				type: String,
				default: "请选择文件"
			},
			type: {
				type: String,
				default: ''
			},
			readonly: {
				type: Boolean,
				default: false
			},
			showCategoryName: {
				type: Boolean,
				default: false
			},
			isView: {
				type: Boolean,
				default: true
			},
			// 允许上传文件大小单位M
			maxSize: {
				type: Number,
				default: 700
			},
			// 支持的文件格式
			allowUploadFileTypes: {
				type: String,
				default: '.avi,.mp4,.mp3,.rar,.zip,.jpg,.jpeg,.png,.gif,.bmp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.vsd,.vsdx'
			},
			data: {
				type: Object,
				default: () => {}
			},
			obj: {
				type: Object,
				default: () => null
			}
		},
		model: {
			prop: 'modelValue',
			event: 'update:modelValue'
		},
		data() {
			return {
				showViewFileForm: false,
				viewFileUrl: "",
				action: (process.env.VUE_APP_BASE_API + '/file/upload'),
				download: (process.env.VUE_APP_BASE_API + '/file/download?value='),
				view: (process.env.VUE_APP_BASE_API + '/file/view?value='),
				package: (process.env.VUE_APP_BASE_API + '/file/package?value='),
				val: this.modelValue,
				list: []
			};
		},
		created() {
			var arry = [];
			if (this.modelValue != null) {
				this.modelValue.forEach((item, index) => {
					arry.push({
						name: item.Name,
						url: this.view + item.FileId,
						time: item.Time != null ? item.Time : "",
						userName: item.UserName != null ? item.UserName : "",
						fileId: item.FileId,
						categoryName: item.CategoryName != null ? item.CategoryName : ""
					});
				});
			} else {
				this.$emit("update:modelValue", arry);
			}
			if (this.obj != null) {
				this.obj.name = this.obj.Name;
				arry.push(this.obj);
			}
			this.list = arry;
		},
		methods: {
			handleRemove(file, files) {
				var that = this;
				var arry = [];
				files.forEach((item, index) => {
					arry.push({
						FileId: (item.response == null ? item.FileId : item.response.Body.Id),
						Category: (item.response == null ? that.category : item.response.Body.Category)
					});
				});
				that.val = arry;
				that.$emit("update:modelValue", that.val);
			},
			handlePreview(file) {
				if (this.isView)
					this.viewFile(this.view + (file.response == null ? file.FileId : file.response.Body.Id));
			},
			handleExceed(files, list) {
				this.$message.warning(
					`当前限制选择 ${this.limit} 个文件,本次选择了 ${files.length} 个文件，共选择了 ${files.length + list.length} 个文件`);
			},
			beforeRemove(file, list) {
				return true;
			},
			onSuccess(res, file) {
				if (res.Head.Result == "success") {
					this.val.push({
						FileId: res.Body.Id,
						Category: this.category
					});
					this.$emit("update:modelValue", this.val);
					this.$emit('onSuccess', res)
				}
			},
			beforeUpload(file) {
				const value = (file.size / 1024 / 1024) < this.maxSize;
				if (!value) {
					this.$message.error('最大允许上传' + this.maxSize + "M大小的" + "文件");
					return false;
				}
				if (this.allowUploadFileTypes != "" && this.allowUploadFileTypes.indexOf(file.name.substr(file.name
						.lastIndexOf('.'), file.name.length)) == -1) {
					this.$message.error("不允许上传该类型文件");
					return false;
				}
				return true;
			},
			viewFile(url) {
				this.showViewFileForm = true;
				this.viewFileUrl = url;
			}
		}
	}
</script>

<style>
	.upload-file-label {
		display: flex;
		align-items: center;
		align-content: center;
		align-items: center;
	}

	.upload-file-label>span {
		font-size: 18px;
	}

	.el-upload__tip {
		font-size: 18px;
		color: #0052cc;
	}

	.upload-file-label .item {
		width: 100%;
		overflow: hidden;
	}

	.upload-file-label .item ul li {
		overflow: hidden;
	}

	.upload-file-label .item li {
		border: 1px dashed #fff;
		overflow: hidden;
		border-radius: 7px;
		transition: none
	}

	.upload-file-label .item .fn {
		padding: 0 5px;
		display: show;
		right: 5px;
		top: 0;
		line-height: inherit;
		font-size: 18px;
		color: #000;
	}

	.upload-file-label .item .fn:hover {
		color: #0052cc;
	}

	.upload-file-label .item .el-upload-list__item:first-child {
		margin-top: 0;
	}

	.upload-file-label .item .el-upload-list__item-status-label-fn {
		position: absolute;
		right: 5px;
		top: 0;
		font-size: 14px;
		height: 100%;
		width: auto;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.in-upload-file .file-item {
		margin: 0 0 5px 0;
	}

	.upload-file-label .item .el-upload-list__item-status-label-fn .text {
		height: 100%;
		display: flex;
		align-items: center;
		color: #000;
		font-size: 14px;
	}

	.in-upload-file .el-upload-list__item .el-progress {
		top: 30px !important;
	}

	.in-upload-file .el-upload-list__item.is-success {
		border: 1px dashed transparent;
	}

	.in-upload-file .el-upload-list__item.is-success:hover {
		border: 1px dashed #0052cc;
		transition: none;
	}
</style>