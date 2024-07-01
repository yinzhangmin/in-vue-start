<template>
	<div class="user-select-content">
		<div v-if="readonly===true" class="lable">
			{{ showValue }}
		</div>
		<el-select v-if="!loading && readonly===false" :multiple="multiple" :placeholder="placeholder"
			:loading="loading" @change="onChange" :filterable="filterable" :clearable="clearable" v-model="selectValue"
			popper-class="user-select" :collapse-tags="collapseTags">
			<el-option v-for="item in options" :label="item.label" :value="(valueType==0?item.value:item.label)"
				:key="item.value">
			</el-option>
		</el-select>
	</div>
</template>

<script>
	import * as $api from '@/utils/http/default'
	export default {
		props: {
			value: {
				type: [String, Number,Array],
				default: () => ''
			},
			modelValue: {
				type: [String, Number,Array],
				default: () => ''
			},
			filterable: {
				type: Boolean,
				default: () => true
			},
			api: {
				type: String,
				default: ''
			},
			params: {
				type: Object,
				default: () => {}
			},
			valueType: {
				type: Number,
				default: 0
			},
			placeholder: {
				type: String,
				default: '请选择'
			},
			data: {
				type: Array,
				default: () => []
			},
			multiple: {
				type: Boolean,
				default: false
			},
			collapseTags: {
				type: Boolean,
				default: true
			},
			readonly: {
				type: Boolean,
				default: false
			},
			clearable: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				loading: false,
				options: this.data,
				selectValue: ''
			}
		},
		computed: {
			showValue() {
				switch (this.valueType) {
					case 0:
						var obj = this.options.find(x => x.value == this.value);
						if (obj != null) {
							return obj.label;
						}
						break;
					case 1:
						var obj1 = this.options.find(x => x.label == this.value);
						if (obj1 != null) {
							return obj1.label;
						}
						break;
					default:
						return "-";
				}


			}
		},
		created() {
			this.selectValue = (this.value == 0 ? "" : this.value);
			this.get();
		},
		methods: {
			async get() {
				if (this.api != '') {
					this.loading = true;
					var data = await $api.http(this.api, this.params);
					this.options = data;
					this.loading = false;
				}
			},
			onChange(value) {
				this.selectValue = value;
				// TODO 兼容 vue2
				this.$emit('input', value);
				// TODO　兼容　vue3
				this.$emit('update:modelValue', value)
			}
		}
	}
</script>

<style>
	.user-select .el-input--medium .el-input__inner {
		border: none !important;
	}

	.user-select .el-select .el-input.is-focus .el-input__inner {
		border: none !important;
	}

	.user-select .el-select-dropdown__wrap.el-scrollbar__wrap {
		margin-bottom: 0px !important;
		margin-left: 2px !important;
	}

	.user-select .el-select-dropdown__item {
		padding: 0 5px;
		font-size: 16px;
	}

	.user-select .el-scrollbar__wrap {
		overflow-x: hidden;
	}

	.user-select-content .el-select-dropdown__item.selected {
		font-weight: normal;
		color: #0052cc;
	}

	.user-select-content>.lable {
		font-size: 1.3rem;
		color: #0052cc;
		min-height: 24px;
	}
</style>