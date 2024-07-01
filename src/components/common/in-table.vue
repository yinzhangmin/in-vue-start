<template>
	<div class="user-table">
		<div class="el-table-title" v-if="head">
			<div class="i1">
				<div class="icon" v-if="titleIcon"><i class="fa-duotone fa-grid-horizontal" style="color:#0052cc" />
				</div>
				<div class="text">{{ title }}</div>
				<div class="tip">{{tip}}</div>
				<div class="state"></div>
			</div>
			<div class="i2">
				<div class='headerSearch'>
					<slot name="headerSearch" />
				</div>
				<el-input v-if="search" v-model="params.search" size="medium"
					prefix-icon="fa-duotone fa-magnifying-glass" placeholder="搜索您想了解的信息" class="search-input" />
				<el-button v-if="search" size="small" style="margin:0 0 0 10px;" type="primary"
					@click="searchClick">搜索</el-button>
				<el-button v-if="showSenior && senior.type=='button'" :icon="senior.icon" size="small"
					style="margin:0 0 0 10px;" type="primary" @click="senior.click">{{senior.title}}</el-button>
				<el-popover style="margin:0 0 0 10px;" @hide="popoverHide" :disabled="popoverDisabled" placement="left"
					:width="popoverWidth"
					v-if="senior.form !=null && (showSenior || (senior.fns!=null? senior.fns.length > 0:false)) && (senior.type=='dropdown' || senior.type==null)">
					<component :is="senior.form" v-model="senior.mainForm.userParams" :mainForm="this"></component>
					<el-dropdown size="small" split-button type="primary" @command="handleCommand"
						@click="senior.click!=null && senior.click(that,senior)" slot="reference">
						<span>{{senior.title}}</span>
						<el-dropdown-menu slot="dropdown" class="user-dropdown">
							<el-dropdown-item :divided="item.divided"
								v-for="(item,index) in (senior.fns.length == 0? fns:senior.fns)" :key="index"
								:icon="item.icon==null?'fa-duotone fa-circle-nodes':item.icon"
								:style="item.style==null?{color:'#000'}:item.style" :command="item.command">
								{{ item.text }}
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-popover>
				<el-dropdown style="margin:0 0 0 10px;" size="small" split-button type="primary"
					@command="handleCommand"
					v-if="senior.form ==null && (showSenior || (senior.fns!=null? senior.fns.length > 0:false)) && (senior.type=='dropdown' || senior.type==null)"
					@click="senior.click!=null && senior.click(that,senior)">
					{{senior.title}}
					<el-dropdown-menu slot="dropdown" class="user-dropdown">
						<el-dropdown-item :divided="item.divided"
							v-for="(item,index) in (senior.fns.length == 0? fns:senior.fns)" :key="index"
							:icon="item.icon==null?'fa-duotone fa-circle-nodes':item.icon"
							:style="item.style==null?{color:'#000'}:item.style" :command="item.command">
							{{ item.text }}
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>

				<slot name="actions"></slot>
			</div>
		</div>
		<el-table ref="singleTable" v-loading="loading" :max-height="tableHeight" :resizable="false"
			:tree-props="treeProps" highlight-current-row :border="border" :header-cell-style="headerCellStyle"
			:header-row-style="headerCellStyle" style="width: 100%;" :size="size" :data="tableData" :row-key="rowKey"
			@select="cellSelect" @row-click="rowSelect" @selection-change="handleSelectionChange"
			@select-all="cellSelectAll">
			<el-table-column :index="showIndex" fixed="left" class-name="row-number" align="center" label="#"
				type="index" width="60" />
			<!-- 是否启动checkbox -->
			<el-table-column v-if="selection" fixed="left" type="selection" width="55" align="center" />
			<el-table-column v-for="(item, index) in columns" :key="index" v-bind="item">
				<template v-slot="scope">
					<!-- 文本显示 -->
					<template v-if="item.prop">
						<!-- link -->
						<div class="text" :align="item.align" v-if="item.type === 'link'">
							<el-link :style="item.userStyle?item.userStyle(scope.row): item.style" type="primary"
								@click="item.click(item,scope.row)">
								<div class='link-html-value' v-html="item.linkName !=null? ( item.userValue !=null?item.userValue(item.linkName,scope.row): item.linkName): item.userValue !=null? item.userValue((item.prop.indexOf('.') == -1 ? (scope.row[item.prop] || '-')
						      : (scope.row[item.prop.split('.')[0]][item.prop.split('.')[1]] || '-')),scope.row)
						      :(item.prop.indexOf('.') == -1 ? (scope.row[item.prop] || '') :
						        (scope.row[item.prop.split('.')[0]][item.prop.split('.')[1]] || '-'))" />
							</el-link>
						</div>
						<!-- 输入框 -->
						<div v-else-if="item.type === 'input'">
							<in-input v-model="scope.row[item.prop]" />
						</div>
						<!--多行（存在问题）-->
						<div v-else-if="item.type === 'textarea'">
							<in-input v-model="scope.row[item.prop]" type="textarea" />
						</div>
						<!-- 多选框 -->
						<div v-else-if="item.type === 'checkbox'">
							<el-checkbox v-model="scope.row[item.prop]"></el-checkbox>
						</div>
						<!-- 滑动框 -->
						<div v-else-if="item.type === 'slider'">
							<el-slider v-model="scope.row[item.prop]"></el-slider>
						</div>
						<div v-else-if="item.type === 'switch'">
							<el-switch v-model="scope.row[item.prop]" @change="item.change(scope.row,item,this)" />
						</div>
						<!-- 数字 -->
						<div v-else-if="item.type === 'number'">
							<el-input-number size="small" v-model="scope.row[item.prop]" :min="0" :max="100">
							</el-input-number>
						</div>
						<!-- 图片 -->
						<div v-else-if="item.type === 'img'">
							<el-image style="height: 40px;" :src="scope.row[item.prop]" />
						</div>
						<!-- html -->
						<div v-else-if="item.type === 'html'">
							<div v-html="scope.row[item.prop]" />
						</div>
						<!-- icon -->
						<div v-else-if="item.type === 'icon'">
							<i :class="scope.row[item.prop]" />
						</div>
						<!-- 文本 scope.row["Info"][item.prop] || '-'  -->
						<span v-else class="text"
							:title=" (item.tip==null && item.tip=='') && (item.prop.indexOf('.') == -1 ? (scope.row[item.prop] || '-') : (scope.row[item.prop.split('.')[0]][item.prop.split('.')[1]] || '-'))"
							:style="item.userStyle?item.userStyle(scope.row): item.style || cellStyle"
							@click="cellTextClick(scope,{ prop:item,index: scope.$index, data: scope.row })">
							<el-tooltip
								v-if="item.tip!=null && (typeof(item.tip)=='string'?(item.tip !=null && item.tip !=''):(item.tip(item,scope.row) !=null && item.tip(item,scope.row) !=''))"
								:content="(typeof(item.tip)=='string'?item.tip:item.tip(item,scope.row))"
								placement="top">
								<i class='fa-duotone fa-comment-dots' />
							</el-tooltip>
							{{ (item.prop.indexOf('.') == -1 ? (scope.row[item.prop] || '-') : (scope.row[item.prop.split('.')[0]][item.prop.split('.')[1]] || '-')) }}
						</span>
					</template>
					<!-- 按钮显示 -->
					<div v-else-if="item.btns">
						<template
							v-for="em in item.btns.filter(x=>{ return  (x.where==null?true:x.where(scope.row,x)); })">
							<component :is="item.btnType" v-if="em.btns==null || em.btns.length==0" size="small"
								v-bind="em"
								:icon="(typeof(em.icon)==='string' || em.icon==null )? em.icon:em.icon(scope.row,em)"
								@click="cellBtnClick(em,{ index: scope.$index, data: scope.row })">
								{{ typeof(em.btnName)==="string"?em.btnName:em.btnName(scope.row,em) }}
							</component>
							<el-dropdown
								v-if="em.btns !=null && em.btns.filter(x=>{ return (x.show==null || x.show) }).length > 0"
								@command="handleRowCommand" trigger="click">
								<span class="el-dropdown-link">
									{{ em.btnName }}<i class="el-icon-arrow-down el-icon--right" />
								</span>
								<el-dropdown-menu slot="dropdown">
									<template v-for="btn in em.btns">
										<el-dropdown-item
											v-if="btn.show==null?true: typeof(btn.show)==='boolean'?btn.show:(btn.show(scope.row))"
											:icon="btn.icon" :command="{command:btn,data:scope.row}">
											{{ typeof(btn.btnName)==="string"?btn.btnName:btn.btnName(scope.row,btn) }}
										</el-dropdown-item>
									</template>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</div>
				</template>
			</el-table-column>
			<template v-slot:empty>
				<el-empty description="暂无数据" :image-size='emptySize'></el-empty>
			</template>
		</el-table>
		<div class="el-table-pagination" v-if="totalPages > 0">
			<el-pagination :hide-on-single-page="hideOnSinglePage" background :layout="layout"
				:page-sizes="[50, 100,200,300,500,1000,3000]" :page-size="params.pageSize" :total="total"
				@current-change="currentChange" @size-change="handleSizeChange" />
		</div>
	</div>
</template>

<script>
	import tableMixin from '@/mixins/in-table-mixin'
	export default {
		mixins: [tableMixin],
		props: {
			treeProps: {
				type: Object,
				default: () => {
					return {

					}
				}
			},
			title: {
				type: String,
				default: ''
			},
			titleIcon: {
				type: Boolean,
				default: true
			},
			tip: {
				type: String,
				default: ''
			},
			search: {
				type: Boolean,
				default: true
			},
			head: {
				type: Boolean,
				default: true
			},
			showSenior: {
				type: Boolean,
				default: false
			},
			senior: {
				type: Object,
				default: () => {
					return {
						title: '高级',
						type: 'dropdown',
						fns: []
					}
				}
			},
			emptySize: {
				type: Number,
				default: 150
			},
			fns: {
				type: Array,
				default: () => []
			},
			showTitle: {
				type: Boolean,
				default: true
			},
			selection: {
				type: Boolean,
				default: false
			},
			border: {
				type: Boolean,
				default: true
			},
			columns: {
				type: Array,
				default: null
			},
			size: {
				type: String,
				default: 'mini'
			},
			pageSize: {
				type: Number,
				default: 50
			},
			cardBtnName: {
				type: String,
				default: ''
			},
			layout: {
				type: String,
				default: 'prev, pager,total,sizes,next,total'
			},
			cellStyle: {
				type: [Object],
				default: () => {
					return {

					}
				}
			},
			headerCellStyle: {
				type: Object,
				default: () => {
					return {
						fontSize: '16px',
						color: '#000',
						fontWeight: 'normal',
						backgroundColor: '#fafafa'
					}
				}
			},
			adjustHeigth: {
				type: Number,
				default: () => 0
			},
			rowKey: {
				type: String,
				default: () => "Id"
			},
			hideOnSinglePage: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				multipleSelection: [],
				that: this,
				popoverWidth: 420,
				popoverDisabled: true
			}
		},
		components: {

		},
		computed: {
			tableHeight() {
				return document.body.clientHeight - 180 + this.adjustHeigth;
			}
		},
		mounted() {

		},
		created() {

		},
		unmounted() {},
		methods: {
			popoverHide() {
				this.popoverDisabled = true;
			},
			handleCommand(command, component) {
				command(this, component)
			},
			handleRowCommand(flag, component) {
				if (flag.command.click != null) {
					flag.command.click(flag.data, flag.command, this)
				} else {
					switch (flag.command.action) {
						case 'remove':
							this.remove(flag.data, flag)
							break
						case 'edit':
							this.edit(flag.data, flag)
							break
					}
				}
			},
			cellTextClick(flag, {
				prop,
				index,
				data
			}) {
				if (prop.click != null) {
					prop.click(flag, prop, index, data)
				}
			},
			// 单元格按钮点击时触发
			cellBtnClick(flag, {
				index,
				data
			}) {
				if (flag.click != null) {
					flag.click(data, flag, index, this);
				} else {
					switch (flag.action) {
						case 'remove':
							this.remove(data, flag);
							break
						case 'edit':
							this.edit(data, flag);
							break
					}
				}
				this.$emit('cellBtnClick', {
					flag,
					index,
					data
				})
			},
			// 点击卡片右上角按钮触发
			cardBtnClick(e) {
				this.$emit('cardBtnClick', e)
			},
			// 单元格勾选时触发
			cellSelect(selection, row) {
				this.$emit('cellSelect', selection, row)
			},
			// 单元格全选时触发
			cellSelectAll(selection) {
				this.$emit('cellSelectAll', selection)
			},
			// 单元格cheage事件
			cellSelectionChange(selection) {
				this.$emit('cellSelectionChange', selection)
			},
			// 点击 单元格 link时间
			cellLinkClick(prop, row) {
				this.$emit('cellLinkClick', prop, row)
			},
			rowSelect(row, column, event) {
				this.$refs.singleTable.setCurrentRow(row)
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			}
		}
	}
</script>

<style>
	.user-table {
		height: auto;
		width: 100%;
		overflow: hidden;
		border-radius: 5px;
	}

	.user-table .el-table {
		border-radius: 5px;
	}

	.user-table .el-table .el-table__fixed-right-patch {
		background-color: #fafafa;
	}

	.user-table .el-table thead {
		background-color: #fafafa;
		line-height: 40px;
	}

	.user-table .el-table td {
		padding: 1px 0;
	}

	.user-table .el-table th {
		background-color: #fafafa;
		font-weight: normal;
		min-height: 30px;
		padding: 0px 0px;
	}

	.user-table .el-table th td {
		background-color: #fafafa;
	}

	.user-table .el-table tr {
		min-height: 30px;
	}

	.user-table .el-table .cell {
		word-wrap: break-word;
		font-size: 16px;
		line-height: 30px;
	}

	.user-table .el-table .cell>span.text,
	.user-table .el-table .cell>div.text,
	.user-table .el-table .cell .el-link--inner {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.user-table .el-table .cell .in-input {
		background-color: transparent;
		border-radius: 3px;
	}

	.user-table .el-table .cell .in-input .el-input__inner {
		background-color: #fff;
		border: 1px dashed #888;
		height: 32px;
		border-radius: 5px;
		color: #0052cc;
	}

	.user-table .el-table .cell .el-input-number .el-input__inner {
		color: #0052cc;
		font-size: 16px;
	}

	.user-table .el-table .cell .in-input .el-input__inner:focus {
		border: 1px dashed #000;
	}

	.user-table .el-table .cell .text[align='left'] .el-link {
		width: 100%;
		justify-content: left;
	}

	.user-table .el-table th.is-leaf,
	.user-table .el-table td {
		border-bottom: 1px dashed transparent;
	}

	.user-table .el-table--border th,
	.user-table .el-table--border td {
		border-right: 1px dashed transparent;
		transition: none;
	}

	.user-table .el-table--group,
	.user-table .el-table--border {
		border: 1px dashed #eee;
	}

	.user-table .el-table {
		border: none;
		/* border-bottom: 1px dashed transparent; */
	}

	.user-table .el-table.el-table--scrollable-y {
		/* border-bottom: 1px dashed #eee; */
	}

	.user-table .el-table--border th:last-child,
	.user-table .el-table--border td:last-child {
		border-right: 1px dashed transparent;
	}

	.user-table .el-table-title {
		height: 42px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.user-table .el-table-title>.i2 {
		display: flex;
		height: 100%;
		align-items: center;
		justify-items: flex-end;
	}

	.user-table .headerSearch {
		padding: 0 10px 0 0;
	}

	.user-table .el-table-title>.i1 {
		display: flex;
		height: 100%;
		align-items: center;
	}

	.user-table .el-table-title>.i1>.icon {
		margin-right: 5px;
		margin-left: 10px;
	}

	.user-table .el-table-title>.i1>.text {
		margin-right: 5px;
		margin-left: 5px;
		font-size: 18px;
	}

	.user-table .el-table-title>.i1>.tip {
		margin-right: 5px;
		margin-left: 5px;
		font-size: 13px;
		color: #0052cc;
	}

	.user-table .row-number {
		background-color: #fafafa;
		font-size: 14px;
	}

	.user-table .el-table {
		color: #000;

	}

	.user-table .el-table--fluid-height .el-table__fixed,
	.el-table--fluid-height .el-table__fixed-right {
		/* bottom: 25px !important; */
	}

	.user-table .el-table tr.current-row {}

	.user-table .el-table__body tr.current-row>td.row-number {
		background-color: #0052cc;
		color: #fff;
		border-right: 1px dashed #0052cc;
		border-bottom: 1px dashed #0052cc;
		border-top-left-radius: 7px;
		border-bottom-left-radius: 7px;
	}

	.user-table .el-table__body tr.current-row.el-table__row--striped>td.row-number {
		background-color: #0052cc;
	}

	.user-table .el-table-pagination {
		display: flex;
		padding: 10px 0;
	}

	.user-table .el-pagination {
		padding: 0;
	}

	.user-table .el-pagination.is-background .btn-prev {
		margin: 0 5px 0 0;
	}

	.user-table .el-button--medium {
		padding: 5px 20px;
		margin-left: 10px;
	}

	.user-table .empty {
		display: flex;
		padding: 70px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.user-table .empty>i {
		font-size: 32px;
	}

	.user-table .empty>span {
		font-size: 14px;
	}

	.user-table .el-button--text {
		font-size: 14px;
	}

	.user-table .el-table::before {
		height: 0;
	}

	.user-table .el-table__fixed::before,
	.el-table__fixed-right::before {
		height: 0;
	}

	.user-table .el-dropdown-link {
		cursor: pointer;
		color: #0052cc;
		padding: 0 0 0 10px;
	}

	.user-table .el-icon-arrow-down {
		font-size: 14px;
	}

	.user-dropdown.el-dropdown-menu--small .el-dropdown-menu__item {
		font-size: 14px;
		color: #000;
	}

	.el-table--group::after,
	.el-table--border::after {
		width: 0;
	}

	.el-table__fixed::before,
	.el-table__fixed-right::before {
		width: 0;
	}


	.el-pagination.is-background .btn-prev,
	.el-pagination.is-background .btn-next,
	.el-pagination.is-background .el-pager li {
		border-radius: 7px;
	}

	.user-table .el-table__empty-text {
		line-height: 20px;
		width: 100% !important;
	}

	.user-table .el-table__empty-block {
		text-align: left;
		width: 100% !important;
		padding-top: 10px;
	}

	.user-table .el-table--enable-row-transition .el-table__body td.el-table__cell {
		transition: none;
	}

	.user-table .search-input {
		width: 240px;
	}

	.user-table .search-input .el-input__inner {
		padding-left: 30px !important;
	}

	.el-table__fixed-right-patch {
		border-bottom: none !important;
	}

	.el-table--border th.el-table__cell.gutter:last-of-type {
		border-bottom: none !important;
	}

	.user-table .el-link {
		font-size: 16px;
	}

	.user-table .link-html-value {
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>