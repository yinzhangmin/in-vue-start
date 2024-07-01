<template>
	<div class="in-input-content">
		<div v-if="readonly===true" class="lable" :style="readonlyStyle">{{(val==""||val==null)?"-":val}}</div>
		<div v-if="readonly===false" class="in-input">
			<el-input :prefix-icon="prefixIcon" :type="type" class="uni-input" autosize :value="val"
				:placeholder="placeholder" :autocomplete="autocomplete" @blur="onBlur" @input="onInput"
				@confirm="onConfirm" @focus="onFocus" ref="inInput" />
		</div>
		<div class="in-data-tip" v-if="showTip && readonly===false">
			<div class="i">
				<div class="circular" @tap="showTipData">
					<i class='fa-duotone fa-brightness-low'></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
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
			},
			prefixIcon: {
				type: String,
				default: ''
			},
			autocomplete: {
				type: String,
				default: 'off'
			},
			readonlyClick: {
				type: Function,
				default: () => {}
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
				});
			}
		},
		methods: {
			focus() {
				this.$refs.inInput.focus();
			},
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
	.in-input-content {
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.in-input-content>.lable {
		font-size: 1.3rem;
		color: #0052cc;
		min-height: 24px;
	}

	.in-data-tip {
		display: flex;
		align-items: center;
		justify-items: center;
		border-radius: 0.7rem;
		padding: 0;
		flex-grow: 5;
		justify-content: space-between;
		justify-items: center;
		align-items: center;
		text-align: center;
	}

	.in-data-tip>.i {
		height: 100%;
		width: 100%;
		border-radius: 2rem;
		padding: 0;
		color: #0052CC;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.in-data-tip>.i>.circular {
		/* border: 2px dashed #3385FF; */
		display: flex;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 1.5rem;
		justify-content: center;
		align-items: center;
		animation: rotate-scale-up 15s linear infinite;
	}

	.in-data-tip>.i>.circular>.dot {
		display: block;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 1.5rem;
		text-align: center;
		display: flex;

		align-items: center;
		justify-content: center;
	}

	.in-data-tip>.i>.circular>i {
		font-size: 2.2rem;
		color: #0052cc;
	}

	.in-input {
		border: none;
		border-radius: 0.7rem;
		padding: 0;
		color: #0052CC;
		background-color: #eee;
		flex-grow: 90;
	}

	.in-input>uni-input {
		font-size: 1.5rem;
		padding-left: .25rem;
		border: none;
		padding-left: .4rem;
	}

	.in-input>uni-input .input-placeholder {
		font-size: 1.2rem;
	}

	.in-input>uni-textarea {
		width: 100%;
		box-sizing: border-box;
		color: #0052CC;
		background-color: #eee;
		border-radius: 0.7rem;
		padding: .2rem .2rem .2rem .4rem;
	}

	.in-input>uni-textarea .uni-textarea-placeholder {
		font-size: 1.2rem;
		padding: .2rem .2rem .2rem 0rem;
	}
</style>