<template>
	<div class="in-form-create">
		<form-create :option="option" :rule="rule" />
	</div>
</template>

<script>
	export default {
		components: {

		},
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				rule: [{
						type: 'input',
						field: 'goods_name',
						title: '商品名称'
					},
					{
						type: 'datePicker',
						field: 'created_at',
						title: '创建时间'
					}
				],
				option: {
					//行内表单模式
					inline: false,
					//表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
					labelPosition: 'right',
					//表单域标签的后缀
					labelSuffix: undefined,
					//是否显示必填字段的标签旁边的红色星号
					hideRequiredAsterisk: false,
					//表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
					labelWidth: '125px',
					//是否显示校验错误信息
					showMessage: true,
					//是否以行内形式展示校验信息
					inlineMessage: false,
					//是否在输入框中显示校验结果反馈图标
					statusIcon: false,
					//是否在 rules 属性改变后立即触发一次验证
					validateOnRuleChange: true,
					//是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效
					disabled: false,
					//用于控制该表单内组件的尺寸 medium / small / mini
					size: undefined,
					//是否显示 label
					title: true
				}
			}
		},
		computed: {

		},
		created() {},
		methods: {

		}
	}
</script>

<style>

</style>