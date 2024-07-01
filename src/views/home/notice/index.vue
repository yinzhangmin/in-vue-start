<template>
	<div class="my-todo" :style="formData.style">
		<div class="l1">
			<div class="fn">
				<div class="title">
					<div class="text">
						<i class="fa-duotone fa-grid-horizontal" style="color: #0052cc; padding: 0 5px" />
						通知公告&新闻
					</div>
				</div>
				<div class="info">
					<div class="i">
						<div class="value">
							<i class="fa-duotone fa-ellipsis"></i>
						</div>
					</div>
				</div>
			</div>
			<div class="content">
				<el-empty v-if="formData.list.length == 0" :image-size="200"></el-empty>
				<div class="news" v-for="item in formData.list">
					<div class="item" @click="info(item.id)">
						<div class="name">
							<span>{{ item.title }}</span>
						</div>
						<div class="info">
							<span class="date">发布日期：{{ item.time }}</span>
							<span class="count">分类：{{ item.category }}</span>
						</div>
					</div>
					<div class="in-divider"></div>
				</div>
			</div>
		</div>
		<in-drawer class="user-drawer" :appendToBody="true" v-model="showRendonlyForm" size="1100px" :title="formTitle" direction="ltr"></in-drawer>
	</div>
</template>

<script setup>
let formData = reactive({
	style: {
		height: (document.body.clientHeight - 147) + "px"
	},
	list: [
		{
			id: 1,
			title: '国产自研工作流引擎，其特点简洁轻量但又不简单，五脏俱全，组件独立，可扩展，可满足中小项目的组件',
			time: '2024年06月13日',
			category: '新闻'
		},
		{
			id: 2,
			title: '人工智能迭代一切，文科生将是“最后幸存者”',
			time: '2024年06月13日',
			category: '新闻'
		},
		{
			id: 3,
			title: '华为鸿蒙首超苹果 iOS，成 2024 年 Q1 中国第二大手机操作系统',
			time: '2024年06月13日',
			category: '新闻'
		},
		{
			id: 4,
			title: '台积电前董事长放话，称大陆芯片不可能超越台积电，将永远赢下去',
			time: '2024年06月13日',
			category: '新闻'
		},
		{
			id: 5,
			title: '台积电前董事长放话，称大陆芯片不可能超越台积电，将永远赢下去',
			time: '2024年06月13日',
			category: '新闻'
		},
		{
			id: 6,
			title: '台积电前董事长放话，称大陆芯片不可能超越台积电，将永远赢下去',
			time: '2024年06月13日',
			category: '新闻'
		}
	]
});
</script>

<style scoped>
.my-todo {
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	border-radius: 7px;
	overflow: hidden;
	box-sizing: border-box;
}

.my-todo > .l1 {
	height: 100%;
	width: 100%;
	display: flex;
	box-sizing: border-box;
	padding: 10px 3px 5px 3px;
	flex-direction: column;
}

.my-todo > .l1 > .fn {
	width: 100%;
	height: 40px;
	display: flex;
	justify-items: center;
	padding: 0 10px;
	justify-content: space-between;
	white-space: nowrap;
}

.my-todo > .l1 > .fn > .title {
	display: flex;
	justify-items: center;
	align-content: center;
	align-items: center;
}

.my-todo > .l1 > .fn > .title > .text {
	color: #000;
	font-size: 18px;
}

.my-todo > .l1 > .fn > .title > .select {
	color: #000;
	padding-left: 15px;
}

.my-todo > .l1 > .fn > .info {
	display: flex;
	align-items: center;
}

.my-todo > .l1 > .fn > .info > .i {
	display: flex;
	align-items: center;
	padding: 5px 5px;
	/* background-color: #eee; */
	border-radius: 7px;
	margin-left: 10px;
	justify-content: center;
	cursor: pointer;
	transition: all 0.2s;
}

.my-todo > .l1 > .fn > .info > .i:hover {
	background-color: #eee;
}

.my-todo > .l1 > .fn > .info > .i > .text {
	color: #777;
}

.my-todo > .l1 > .fn > .info > .i > .value {
	color: #0052cc;
	font-size: 18px;
	padding: 0 5px;
	cursor: pointer;
}

.my-todo > .l1 > .content {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	padding: 0 5px;
	overflow-x: auto;
}

.my-todo > .l1 > .content > .news > .item {
	padding: 5px;
	border-radius: 10px;
	cursor: pointer;
}

.my-todo > .l1 > .content > .news > .item:hover {
}

.my-todo > .l1 > .content > .news > .item:hover > .name {
	color: #0052cc;
}

.my-todo > .l1 > .content > .news > .item > .name {
	line-height: 150%;
}

.my-todo > .l1 > .content > .news > .item > .info {
	padding: 10px 0 5px 0;
	font-size: 14px;
	display: flex;
	justify-content: space-between;
	color: #555;
}

.in-divider {
	border-top: 1px dashed #ccc;
	display: block;
	margin: 10px 0;
}

.content .news:last-child .in-divider {
	border-top: none;
}
</style>
