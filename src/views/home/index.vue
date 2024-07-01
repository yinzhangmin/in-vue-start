<template>
	<div class="container" v-waterMark="'必要（上海）互联网科技有限公司'">
		<div class="body">
			<el-row :gutter="20">
				<el-col :span="24">
					<div class="my-el-col">
						<statistics-form @onSuccess="onSuccess" />
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="16">
					<div class="my-el-col">
						<charts-form />
					</div>
					<div class="my-el-col">
						<charts-form />
					</div>
				</el-col>
				<el-col :span="8" style="padding-left: 0px; padding-right: 12px">
					<div class="my-el-col">
						<notice-form />
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script setup>
import statisticsForm from './statistics';
import chartsForm from './charts';
import noticeForm from './notice';
</script>
<style scoped>
.container {
	padding: 0 5px 0 0;
	width: 100%;
	box-sizing: border-box;
	overflow: hidden;

	.body {
		height: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}

	.show-max {
		position: absolute;
		top: 0;
		width: calc(100% - 20px);
		transition: 0.5s;
	}

	.el-row {
		margin-bottom: 5px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.my-el-col {
		margin-bottom: 5px;
	}

	.el-col {
		border-radius: 4px;
	}

	.my-col {
		border-radius: 7px;
		min-height: 36px;
		background-color: #fff;
	}
}
</style>
