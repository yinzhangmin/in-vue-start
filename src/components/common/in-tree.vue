<template>
	<div :title="title" class="user-tree">
		<div class="user-tree-title">
			<div class="i1">
				<div class="icon"><i class='fa-duotone fa-list-tree' style='color:#0052cc'></i></div>
				<div class="text">{{title}}</div>
			</div>
		</div>
		<div class="user-tree-content" style="padding: 0 8px;">
			<el-tree :load="loadNode" :lazy="lazy" :default-expand-all="defaultExpandAll"
				:default-checked-keys="defaultCheckedKeys" :default-expanded-keys="defaultExpandedKeys"
				:showCheckbox="showCheckbox" :highlight-current="true" node-key="id"
				icon-class="fa-duotone fa-angle-right" :data="treeData" :props="defaultProps"
				:expand-on-click-node="false" :check-on-click-node="true" @node-click="handleNodeClick"
				@check-change="checkChange" @check="nodeCheck" ref="tree">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span style="padding-right: 5px;"><i class="fa fa-cubes" style='color:#676a6c'></i></span>
					<span>{{ node.label }}</span>
				</span>
			</el-tree>
		</div>
	</div>
</template>

<script>
	import * as $api from '@/utils/http/default'
	export default {
		props: {
			api: {
				type: String,
				default: ''
			},
			childrenApi: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			showTitle: {
				type: Boolean,
				default: true
			},
			showCheckbox: {
				type: Boolean,
				default: false
			},
			lazy: {
				type: Boolean,
				default: false
			},
			defaultCheckedKeys: {
				type: Array,
				default: () => []
			},
			defaultExpandedKeys: {
				type: Array,
				default: () => []
			},
			defaultExpandAll: {
				type: Boolean,
				default: true
			},
			selectData: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				defaultProps: {
					children: 'children',
					isLeaf: "isLeaf",
					label: 'label',
					icon: 'icon',
					count: 'count',
					checked: 'checked'
				},
				rootNode: null,
				rootResolve: null,
				treeData: []
			}
		},
		created() {
			this.get();
		},
		methods: {
			async get() {
				if (!this.lazy) {
					var data = await $api.http(this.api);
					this.treeData = data;
					// this.setCheckedKeys(this.selectData);
				}
			},
			async loadNode(node, resolve) {
				if (node.level == 0) {
					this.rootNode = node;
					this.rootResolve = resolve;
					var data = await $api.http(this.api, {
						value: node.data.value,
						id: node.data.id
					});
					resolve(data);
				} else {
					var data = await $api.http(this.childrenApi, {
						value: node.data.value,
						id: node.data.id
					});
					resolve(data);
				}
			},
			nodeCheck() {

			},
			checkChange(data, node, tree) {

			},
			handleNodeClick(data, node, tree) {
				this.$emit('currentChange', data, node, tree)
			},
			getCheckedNodes() {
				return this.$refs.tree.getCheckedNodes();
			},
			getHalfCheckedKeys() {
				return this.$refs.tree.getHalfCheckedKeys();
			},
			getCheckedKeys() {
				return this.$refs.tree.getCheckedKeys();
			},
			setCheckedKeys(data) {
				if (data != null && data.length > 0 && this.$refs.tree != null) {
					this.$refs.tree.setCheckedKeys(data);
				}
			}
		}
	}
</script>

<style>
	.user-tree {
		border-radius: 10px;
		padding-bottom: 20px;
		overflow: hidden;
		padding: 5px 5px;
	}

	.user-tree .el-tree {
		color: #000;
	}

	.user-tree .el-tree .el-tree-node__label {
		font-size: 16px;
	}

	.user-tree .user-tree-content {
		height: auto;
		overflow: hidden;
		overflow-y: auto;
	}

	.user-tree .user-tree-title {
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.user-tree .user-tree-title>.i2 {
		display: flex;
		height: 100%;
		align-items: center;
	}

	.user-tree .user-tree-title>.i1 {
		display: flex;
		height: 100%;
		align-items: center;
	}

	.user-tree .user-tree-title>.i1>.icon {
		margin-right: 5px;
		margin-left: 10px;
	}

	.user-tree .user-tree-title>.i1>.text {
		margin-right: 5px;
		margin-left: 5px;
		font-size: 18px;
	}

	.user-tree .el-tree-node__content>span.el-tree-node__expand-icon {
		color: #0052cc;
	}

	.user-tree .el-tree-node__content>span.el-tree-node__expand-icon.is-leaf {
		color: transparent;
	}

	.user-tree .el-tree-node__content:hover {
		background-color: #eee !important;
		color: #0052cc !important;
		border-radius: 7px;
	}

	.user-tree .el-tree-node.is-current>.el-tree-node__content {
		background-color: #0052cc !important;
		color: #fff !important;
		border-radius: 7px;
	}

	.user-tree .el-tree-node.is-current>.el-tree-node__content>span.el-tree-node__expand-icon {
		color: #fff !important;
	}

	.user-tree .el-tree-node.is-current>.el-tree-node__content>span.el-tree-node__expand-icon.is-leaf {
		color: transparent !important;
	}

	.user-tree .el-tree-node.is-current>.el-tree-node__content i.fa {
		color: #fff !important;
	}
</style>