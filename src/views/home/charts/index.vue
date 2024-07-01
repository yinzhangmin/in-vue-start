<template>
	<div class="my-charts" v-resize="onResize">
		<div class="l1">
			<div class="fn">
				<div class="title">
					<div class="text">
						<i class="fa-duotone fa-grid-horizontal" style="color: #0052cc; padding: 0 5px" />
						申请趋势图
					</div>
					<div class="select">
						<el-dropdown @command="selectYearHandleCommand" trigger="click">
							<span class="el-dropdown-link">
								<span style="color: #0052cc; font-size: 18px">
									<span v-if="formData.selectYear > 0">{{ formData.selectYear }}年</span>
									<span v-if="formData.selectYear == 0">全部</span>
									<span v-if="formData.selectYear == -1">近12个月</span>
								</span>
							</span>
							<el-dropdown-menu slot="dropdown" size="medium">
								<el-dropdown-item :command="0">全部</el-dropdown-item>
								<el-dropdown-item :command="-1">近12个月</el-dropdown-item>
								<el-dropdown-item :command="item" v-for="item in formData.years">{{ item }}</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
				<div class="info">
					<div class="i" @click="typeClick(item, index)" v-if="index < 6 && item.Count > 0" v-for="(item, index) in formData.yearInfo">
						<div class="icon">
							<div v-if="formData.selectYearType == item.Type">·</div>
						</div>
						<div class="text">{{ item.Name }}</div>
						<div class="value">{{ item.Count }}</div>
					</div>
				</div>
			</div>
			<div ref="contentEl" class="content"></div>
		</div>
	</div>
</template>

<script setup>
import * as echarts from 'echarts';

let contentEl = ref();
let onResize = () => {
	initCharts(contentEl.value);
};
let formData = {
	chart: null,
	years: [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005],
	selectYear: -1,
	yearInfo: [
		{
			Count: 0,
			Name: '全部',
			Type: 0
		},
		{
			Count: 0,
			Name: '发明',
			Type: 1
		},
		{
			Count: 0,
			Name: '实用新型',
			Type: 2
		},
		{
			Count: 0,
			Name: '外观设计',
			Type: 3
		},
		{
			Count: 0,
			Name: '商标',
			Type: 4
		},
		{
			Count: 0,
			Name: '软件著作权',
			Type: 5
		},
		{
			Count: 0,
			Name: '作品著作权',
			Type: 6
		}
	],
	selectYearType: 0,
	chartDataComplete: false
};
let destroyChart = () => {
	if (!formData.chart) return;
	formData.chart.dispose();
	formData.chart = null;
};
let initCharts = (el) => {
	destroyChart();
	formData.chart = echarts.init(el);
	let data = {
		List: [
			['2023/6', '42'],
			['2023/7', '44'],
			['2023/8', '46'],
			['2023/9', '49'],
			['2023/10', '35'],
			['2023/11', '56'],
			['2023/12', '42'],
			['2024/1', '45'],
			['2024/2', '35'],
			['2024/3', '50'],
			['2024/4', '46'],
			['2024/5', '0']
		],
		List2: [
			['2023/6', '13'],
			['2023/7', '13'],
			['2023/8', '14'],
			['2023/9', '7'],
			['2023/10', '6'],
			['2023/11', '8'],
			['2023/12', '4'],
			['2024/1', '9'],
			['2024/2', '6'],
			['2024/3', '1'],
			['2024/4', '1'],
			['2024/5', '0']
		]
	};
	// 将在浏览器空闲时期被调用
	window.requestIdleCallback((idle) => {
		if (idle.timeRemaining() > 0) {
			setOptions(data);
		}
	});
};
let setOptions = (data) => {
	if (formData.chart == null || formData.chart.setOption == null) return;
	formData.chart.setOption({
		grid: {
			left: 10,
			right: 50,
			bottom: 10,
			top: 50,
			containLabel: true
		},
		legend: {
			right: 10,
			data: ['申请数量', '提交官方']
		},
		tooltip: {
			trigger: 'axis'
		},
		xAxis: {
			type: 'category',
			boundaryGap: false
		},
		yAxis: {
			type: 'value',
			axisLine: {
				onZero: false
			},
			axisLabel: {
				formatter: '{value}'
			},
			splitLine: {
				show: true,
				lineStyle: {
					type: 'dashed',
					width: 0.4,
					cap: 'butt'
				}
			}
		},
		series: (function () {
			let arry = [
				{
					name: '提交官方',
					type: 'line',
					smooth: true,
					symbolSize: 10,
					itemStyle: {
						color: {
							type: 'linear',
							colorStops: [
								{
									offset: 0,
									color: '#D9007A'
								}
							]
						}
					},
					lineStyle: {
						color: '#D9007A',
						width: 4
					},
					areaStyle: {
						color: '#D9007A',
						origin: 'auto',
						opacity: '.1'
					},
					markPoint: {
						itemStyle: {
							color: '#D9007A'
						},
						data: [
							{
								type: 'max',
								name: 'Max'
							}
						]
					},
					data: data.List2
				},
				{
					name: '申请数量',
					type: 'line',
					smooth: true,
					symbolSize: 10,
					lineStyle: {
						color: '#0052cc',
						width: 4
					},
					itemStyle: {
						color: {
							type: 'linear',
							colorStops: [
								{
									offset: 0,
									color: '#0052cc'
								}
							]
						}
					},
					areaStyle: {
						color: '#0052cc',
						origin: 'auto',
						opacity: '.2'
					},
					markPoint: {
						itemStyle: {
							color: '#0052cc'
						},
						data: [
							{
								type: 'max',
								name: 'Max'
							}
						]
					},
					data: data.List
				}
			];
			return arry;
		})()
	});
	formData.chart.on('click', function (params) {
		switch (params.componentType) {
			case 'markPoint':
				break;
		}
	});
};
onMounted(() => {
	initCharts(contentEl.value);
});
</script>

<style scoped>
.my-charts {
	justify-content: space-between;
	align-items: center;
	height: 280px;
	background-color: #fff;
	border-radius: 7px;
}

.my-charts > .l1 {
	height: 100%;
	width: 100%;
	display: flex;
	box-sizing: border-box;
	padding: 10px 3px 5px 3px;
	flex-direction: column;
}

.my-charts > .l1 > .fn {
	width: 100%;
	height: 40px;
	display: flex;
	justify-items: center;
	padding: 0 10px;
	justify-content: space-between;
	white-space: nowrap;
}

.my-charts > .l1 > .fn > .title {
	display: flex;
	justify-items: center;
	align-content: center;
	align-items: center;
	min-width: 260px;
	overflow: hidden;
}

.my-charts > .l1 > .fn > .title > .text {
	color: #000;
	font-size: 18px;
}

.my-charts > .l1 > .fn > .title > .select {
	color: #000;
	padding-left: 15px;
}

.my-charts > .l1 > .fn > .info {
	display: flex;
	align-items: center;
	max-width: 600px;
	overflow: hidden;
}

.my-charts > .l1 > .fn > .info > .i {
	display: flex;
	align-items: center;
	padding: 3px 3px;
	/* background-color: #eee; */
	border-radius: 7px;
	margin-left: 10px;
	justify-content: center;
	cursor: pointer;
	transition: all 0.2s;
}

.my-charts > .l1 > .fn > .info > .i:hover {
	background-color: #eee;
}

.my-charts > .l1 > .fn > .info > .i > .text {
	color: #777;
	white-space: nowrap;
}

.my-charts > .l1 > .fn > .info > .i > .value {
	color: #0052cc;
	font-size: 18px;
	padding-left: 5px;
	cursor: pointer;
}

.my-charts > .l1 > .fn > .info > .i > .icon {
	color: #d9007a;
	font-size: 24px;
	font-weight: bold;
}

.my-charts > .l1 > .content {
	display: flex;
	box-sizing: border-box;
	width: 1005;
	height: 100%;
}
</style>
