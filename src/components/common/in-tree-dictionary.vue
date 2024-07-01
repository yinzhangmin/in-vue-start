<template>
	<div :title="title" class="user-tree-dictionary">
		<div class="user-tree-title">
			<div class="i1">
				<div class="icon"><i class='fa-duotone fa-list-tree' style='color:#0052cc'></i></div>
				<div class="text">{{title}}</div>
			</div>
			<div class="i2">
				<div class="icon" @click="refreshClick"><i class='fa-regular fa-rotate'></i></div>
			</div>
		</div>
		<div class="user-tree-content" style="padding: 0 8px;">
			<el-tree ref="dataTree" :load="loadNode" :default-expanded-keys=[] lazy highlight-current node-key="id"
				icon-class="fa-duotone fa-angle-right" :data="treeData" :props="defaultProps"
				:expand-on-click-node="false" :check-on-click-node="true" @node-click="handleNodeClick">
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
			title: {
				type: String,
				default: ''
			},
			showTitle: {
				type: Boolean,
				default: true
			},

			defaultExpandAll: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				defaultProps: {
					children: 'children',
					isLeaf: "isLeaf",
					label: 'label',
					icon: 'icon',
					count: 'count'
				},
				treeData: [],
				rootNode:null,
				rootResolve:null
			}
		},
		created() {},
		methods: {
			handleNodeClick(data, node, tree) {
				this.$emit('currentChange', data, node, tree)
			},
			async loadNode(node, resolve) {
				if (node.level == 0) {
					this.rootNode = node;
					this.rootResolve = resolve;
					var data = await $api.http("Q00019", {
						Parent: node.data.value,
						Group: node.data.group
					});
					resolve(data);
				}else {
					var data = await $api.http("Q00035", {
						Parent: node.data.value,
						Group: node.data.group
					});
					resolve(data);
				}
			},
			refreshClick() {
				var theChildren = this.rootNode.childNodes
				theChildren.splice(0, theChildren.length)
				this.loadNode(this.rootNode, this.rootResolve)
			}
		}
	}
</script>

<style>
	.user-tree-dictionary {
		border-radius: 10px;
		padding-bottom: 20px;
		overflow: hidden;
		padding: 5px 5px;
	}

	.user-tree-dictionary .el-tree {
		color: #000;
	}

	.user-tree-dictionary .el-tree .el-tree-node__label {
		font-size: 16px;
	}

	.user-tree-dictionary .user-tree-content {
		height: calc(100vh - 120px);
		overflow: hidden;
		overflow-y: auto;
	}

	.user-tree-dictionary .user-tree-title {
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.user-tree-dictionary .user-tree-title>.i2 {
		display: flex;
		height: 100%;
		align-items: center;
	}

	.user-tree-dictionary .user-tree-title>.i1 {
		display: flex;
		height: 100%;
		align-items: center;
	}

	.user-tree-dictionary .user-tree-title>.i2>.icon {
		margin-right: 5px;
		margin-left: 10px;
		color: #888;
		cursor: pointer;
	}

	.user-tree-dictionary .user-tree-title>.i2>.icon:hover {
		color: #0052cc;
	}

	.user-tree-dictionary .user-tree-title>.i1>.icon {
		margin-right: 5px;
		margin-left: 10px;
	}

	.user-tree-dictionary .user-tree-title>.i1>.text {
		margin-right: 5px;
		margin-left: 5px;
		font-size: 18px;
	}

	.user-tree-dictionary .el-tree-node__content>span.el-tree-node__expand-icon {
		color: #0052cc;
	}

	.user-tree-dictionary .el-tree-node__content>span.el-tree-node__expand-icon.is-leaf {
		color: transparent;
	}

	.user-tree-dictionary .el-tree-node__content:hover {
		background-color: #eee !important;
		color: #0052cc !important;
		border-radius: 7px;
	}

	.user-tree-dictionary .el-tree-node.is-current>.el-tree-node__content {
		background-color: #0052cc !important;
		color: #fff !important;
		border-radius: 7px;
	}

	.user-tree-dictionary .el-tree-node.is-current>.el-tree-node__content>span.el-tree-node__expand-icon {
		color: #fff !important;
	}

	.user-tree-dictionary .el-tree-node.is-current>.el-tree-node__content>span.el-tree-node__expand-icon.is-leaf {
		color: transparent !important;
	}

	.user-tree-dictionary .el-tree-node.is-current>.el-tree-node__content i.fa {
		color: #fff !important;
	}
</style>
