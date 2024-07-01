<template>
	<div class="in-data-picker">
		<div v-if="readonly===true" class="lable">
			{{(val==""||val==null)?"-":val}}
		</div>
		<div v-if="readonly===false" class="in-input">
			<el-date-picker prefix-icon="none" value-format="yyyy-MM-dd" v-model="val" align="left" type="date"
				:placeholder="placeholder"  @blur="onBlur" @input="onInput" @confirm="onConfirm"
				@focus="onFocus"/>
		</div>
	</div>
</template>

<script>
	export default {
		components: {

		},
		emits: ['click', 'iconClick', 'update:modelValue', 'input', 'focus', 'blur', 'confirm'],
		model: {
			prop: 'modelValue',
			event: 'update:modelValue'
		},
		props: {
			name: String,
			value: [Number, String],
			modelValue: [Number, String],
			autosize: {
				type: Boolean,
				default: true
			},
			type: {
				type: String,
				default: 'text'
			},
			placeholder: String,
			placeholderStyle: String,
			readonlyStyle: Object,
			readonly: {
				type: Boolean,
				default: false
			},
			isTip: {
				type: Boolean,
				default: false
			}
		},
		created() {
			if (!this.value) {
				this.val = this.modelValue
			}
			if (!this.modelValue) {
				this.val = this.value
			}
			this.form = this.getForm('uniForms')
			this.formItem = this.getForm('uniFormsItem')
			if (this.form && this.formItem) {
				if (this.formItem.name) {
					if (!this.is_reset) {
						this.is_reset = false
						this.formItem.setValue(this.val)
					}
					this.rename = this.formItem.name
					this.form.inputChildrens.push(this)
				}
			}
		},
		data() {
			return {
				focused: false,
				errMsg: '',
				val: '',
				showMsg: '',
				border: false,
				isFirstBorder: false,
				showClearIcon: false,
				showPassword: false,
				showTip: false,
				tipSetTimeout: null,
				selectTip: []
			}
		},
		watch: {
			value(newVal) {
				if (this.errMsg) this.errMsg = ''
				this.val = newVal
			},
			modelValue(newVal) {
				if (this.errMsg) this.errMsg = ''
				this.val = newVal
				if (this.form && this.formItem && !this.is_reset) {
					this.is_reset = false
					this.formItem.setValue(newVal)
				}
			},
			focus(newVal) {
				this.$nextTick(() => {
					this.focused = this.focus
				})
			}
		},
		methods: {
			showTipData: function() {
				var that = this;
				clearTimeout(that.tipSetTimeout);
				that.$refs.popup.open("bottom", that.selectTip, (select) => {
					// that.selectTip = select;
					var text = "";
					select.map((item, index) => {
						text += item;
						if (select.length > index + 1) {
							text += ",";
						}
					});
					text = ((that.val !== "" && that.val != null) ? (this.val + ",") : "") + text;
					that.val = text;
					// TODO 兼容 vue2
					this.$emit('input', that.val);
					// TODO　兼容　vue3
					this.$emit('update:modelValue', that.val)
					that.onCloseTip();
				});
			},
			getForm(name = 'uniForms') {
				let parent = this.$parent;
				let parentName = parent.$options.name;
				while (parentName !== name) {
					parent = parent.$parent;
					if (!parent) return false;
					parentName = parent.$options.name;
				}
				return parent;
			},
			onInput(value) {
				if (this.trim) {
					if (typeof(this.trim) === 'boolean' && this.trim) {
						value = this.trimStr(value)
					}
					if (typeof(this.trim) === 'string') {
						value = this.trimStr(value, this.trim)
					}
				}
				if (this.errMsg) this.errMsg = ''
				this.val = value
				// TODO 兼容 vue2
				this.$emit('input', value);
				// TODO　兼容　vue3
				this.$emit('update:modelValue', value)
			},
			onFocus(event) {
				var that = this;
				if (that.isTip === true) {
					clearTimeout(that.tipSetTimeout);
					that.showTip = true;
				}
				this.$emit('focus', event);
			},
			onCloseTip: function() {
				var that = this;
				that.tipSetTimeout = setTimeout(() => {
					that.showTip = false;
				}, 3000);
			},
			onBlur(value) {
				var that = this;
				that.onCloseTip();
				that.$emit('blur', event);
			},
			onConfirm(value) {
				this.$emit('confirm', value);
			},
			onClear(event) {
				this.val = '';
				// TODO 兼容 vue2
				this.$emit('input', '');
				// TODO 兼容 vue2
				// TODO　兼容　vue3
				this.$emit('update:modelValue', '')
			},
			fieldClick() {
				this.$emit('click');
			},
			trimStr(str, pos = 'both') {
				if (pos === 'both') {
					return str.trim();
				} else if (pos === 'left') {
					return str.trimLeft();
				} else if (pos === 'right') {
					return str.trimRight();
				} else if (pos === 'start') {
					return str.trimStart()
				} else if (pos === 'end') {
					return str.trimEnd()
				} else if (pos === 'all') {
					return str.replace(/\s+/g, '');
				} else if (pos === 'none') {
					return str;
				}
				return str;
			}
		}
	}
</script>

<style>
	.in-data-picker {
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.in-data-picker>.lable {
		font-size: 22px;
		color: #0052cc;
		min-height: 24px;
	}
</style>
