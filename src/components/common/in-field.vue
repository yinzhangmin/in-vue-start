<template>
	<div class="field">
		<!--   label   -->
		<div v-if="label" class="label" :style="{textAlign: textalign}"><span>{{ label }}</span></div>

		<div class="plc" :style="{width: width}">
			<!-- 文本录入 -->
			<div v-if="['text', 'number', 'textarea'].includes(type)">
				<el-input v-model="value_" :style="{width: width}" :type="type" :rows="rows" :size="size"
					v-bind="attributes" :placeholder="placeholder?placeholder:'请输入'+ label" :clearable="clearable"
					:disabled="disabled" :readonly="readonly" @change="onChange">
					<template v-if="inputbutton" v-slot:append> <span @click="clickButton">{{ inputbutton }}</span>
					</template>
				</el-input>
			</div>
			<!-- select -->
			<div v-else-if="type==='select'">
				<el-select v-model="value_" :style="{width: width}" :size="size" v-bind="attributes"
					:placeholder="placeholder?placeholder:'请选择'+ label" clearable :disabled="disabled"
					@change="onChange">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div>

			<!-- date -->
			<div v-else-if="['date', 'daterange'].includes(type) ">
				<el-date-picker v-model="value_" :style="{width: width}" :size="size" v-bind="attributes" :type="type"
					value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期"
					end-placeholder="结束日期" :placeholder="placeholder?placeholder:'请选择'+ label" @change="onChange" align="left"/>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		props: {
			valkey: {
				type: String,
				default: ''
			},
			label: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: 'text'
			},
			value: {
				type: [String, Boolean, Number, Array],
				default: null
			},
			size: {
				type: String,
				default: 'mini'
			},
			placeholder: {
				type: [String, Boolean],
				default: false
			},
			options: {
				type: Array,
				default: function() {
					return []
				}
			},
			attributes: {
				type: [Object, Array],
				default: null
			},
			width: {
				type: String,
				default: '100%'
			},
			textalign: {
				type: String,
				default: 'right'
			},
			rows: {
				type: Number,
				default: 2
			},
			inputbutton: {
				type: String,
				default: ''
			},
			readonly: {
				type: Boolean,
				default: false
			},
			clearable: {
				type: Boolean,
				default: true
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				value_: this.value || '' // 避免直接修改父组件数据 引用警告
			}
		},
		watch: {
			value_(newVal) { // 子组件修改当前组件value_ ,当前组件通知他的父组件
				this.$emit('input', newVal)
			},
			value(newVal) { // 父组件更新 更新子组件传给 子子组件value_ 实现父组件与子子组件数据双向绑定 ，
				this.value_ = newVal
			}
		},
		methods: {
			onChange(val) {
				// this.$emit('input', val)
				this.$emit('onChange', {
					key: this.valkey,
					val
				})
			},
			clickButton(e) {
				this.$emit('clickButton', e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.field {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 16px;
		margin: 0px 15px 0px 15px;
		
		.label {
			// min-width: 75px;
			margin-right: 10px;

			span {
				font-weight: 500;
				color: #5f5f5f;
				font-size: 16px;
			}
		}

		div.plc {
			flex: 1
		}

	}
</style>
<style>
	.field .el-input-group__append {
		cursor: pointer
	}
</style>
