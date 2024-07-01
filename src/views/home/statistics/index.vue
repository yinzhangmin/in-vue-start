<template>
	<div class="my-content">
		<div class="right-bottom-bg_xGrtc"></div>
		<div class="loading" v-if="!formData.loadComplete">
			<el-skeleton v-for="item in 6" style="width: 220px" animated>
				<template slot="template">
					<div style="padding: 14px">
						<el-skeleton-item variant="p" style="width: 50%" />
						<div style="display: flex; align-items: center; justify-items: space-between">
							<el-skeleton-item variant="text" style="margin-right: 16px" />
							<el-skeleton-item variant="text" style="width: 30%" />
						</div>
					</div>
				</template>
			</el-skeleton>
		</div>
		<div class="l" v-if="formData.loadComplete">
			<div class="l1">
				<div class="i">
					<div class="text">总数量</div>
					<div class="value" style="width: 80px">
						<div class="text color1" @click="toClick('/patent/list')">
							<!-- <el-statistic title="" :value="useTransitionValue(formData.patendCount)" /> -->
							<animatedNumber from="0" :to="formData.patendCount">
								<template #default="{ option, item }">
									<span style="font-size: 24px">{{ item.number }}</span>
								</template>
							</animatedNumber>
						</div>
						<div class="unit">例</div>
					</div>
				</div>
				<div class="i">
					<div class="text">申请人数</div>
					<div class="value" sstyle="width: 70px;">
						<div class="text" @click="toClick('/report/user')">
							<animatedNumber from="0" :to="formData.patendUserCount">
								<template #default="{ option, item }">
									<span style="font-size: 24px">{{ item.number }}</span>
								</template>
							</animatedNumber>
						</div>
						<div class="unit color1">人</div>
					</div>
				</div>
				<div class="i">
					<div class="text">代理机构</div>
					<div class="value" style="width: 70px">
						<div class="text color1" @click="toClick('/agency/list')">
							<animatedNumber from="0" :to="formData.agencyCount">
								<template #default="{ option, item }">
									<span style="font-size: 24px">{{ item.number }}</span>
								</template>
							</animatedNumber>
						</div>
						<div class="unit">所</div>
					</div>
				</div>
				<!-- <div class="i">
					<div class="text">系统账户数</div>
					<div class="value" style="width: 100px;">
						<div class="text color1" @click="toClick('/settings/users')">
							<animatedNumber from="0" :to="formData.UserCount"></animatedNumber>
						</div>
						<div class="unit">个</div>
					</div>
				</div> -->
				<div class="i none">
					<div class="line"></div>
				</div>
				<div class="i">
					<div class="text">发生总费用</div>
					<div class="value" style="width: 120px">
						<div class="text color2" @click="toClick('/patent/cost')">
							<animatedNumber from="0" :to="formData.totalCost">
								<template #default="{ option, item }">
									<span style="font-size: 24px">{{ item.number }}</span>
								</template>
							</animatedNumber>
						</div>
						<div class="unit">元</div>
					</div>
				</div>
				<div class="i">
					<div class="text">官费</div>
					<div class="value" style="width: 100px">
						<div class="text color2" @click="toClick('/patent/cost')">
							<animatedNumber from="0" :to="formData.agencyCost">
								<template #default="{ option, item }">
									<span style="font-size: 24px">{{ item.number }}</span>
								</template>
							</animatedNumber>
						</div>
						<div class="unit">元</div>
					</div>
				</div>
				<div class="i">
					<div class="text">代理费</div>
					<div class="value" style="width: 100px">
						<div class="text color2" @click="toClick('/patent/cost')">
							<animatedNumber from="0" :to="formData.patendCost">
								<template #default="{ option, item }">
									<span style="font-size: 24px">{{ item.number }}</span>
								</template>
							</animatedNumber>
						</div>
						<div class="unit">元</div>
					</div>
				</div>
			</div>
			<div class="l1">
				<div class="i none">
					<div class="line"></div>
				</div>
				<div class="i">
					<div class="text">您使用应用</div>
					<div class="value">
						<div class="text" style="color: #0097cc">
							<animatedNumber from="0" :to="formData.userUse">
								<template #default="{ option, item }">
									<span style="font-size: 24px">{{ item.number }}</span>
								</template>
							</animatedNumber>
						</div>
						<div class="unit">天</div>
					</div>
				</div>
				<div class="i">
					<div class="text">应用运行</div>
					<div class="value">
						<div class="text" style="color: #0097cc">
							<animatedNumber from="0" :to="formData.appRun">
								<template #default="{ option, item }">
									<span style="font-size: 24px">{{ item.number }}</span>
								</template>
							</animatedNumber>
						</div>
						<div class="unit">天</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
let formData = reactive({
	loadComplete: true,
	patendCount: 4286,
	patendUserCount: 565,
	agencyCount: 16,
	userCount: 15915,
	totalCost: 1111110.0,
	agencyCost: 0.0,
	patendCost: 0.0,
	userUse: 125.0,
	appRun: 242.0
});
let useTransitionValue = (value) => {
	return useTransition(value, {
		duration: 1500
	}).value;
};
let toClick = () => {
	this.$router.push(path);
};
</script>

<style scoped>
.my-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-width: 1250px;
	border-radius: 7px;
	height: 80px;
	width: 100%;
	overflow: hidden;
	position: relative;
	background: #fff -webkit-radial-gradient(33% 25%, circle, rgba(47, 180, 255, 0.02) 0, rgba(91, 194, 255, 0) 74%);
}

.my-content > .loading {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.my-content > .l {
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-width: 1250px;
	border-radius: 7px;
	height: 80px;
	width: 100%;
}

.my-content > .l > .l1 {
	display: flex;
}

.my-content > .l > .l1 > .i {
	padding: 0 10px;
	margin: 10px 0;
	margin-left: 5px;
	overflow: hidden;
	min-width: 90px;
}

.my-content > .l > .l1 > .i.none {
	padding: 0 5px;
	min-width: 1px;
}

.my-content > .l > .l1 > .i > .line {
	background-color: #eee;
	height: 50px;
	display: block;
	overflow: hidden;
	width: 0.5px;
	margin: 10px 5px;
}

.my-content > .l > .l1 > .i > .text {
	color: #000;
	padding: 5px 0;
	width: 100%;
	display: block;
}

.my-content > .l > .l1 > .i > .value {
	padding: 5px 0;
	display: flex;
	align-items: baseline;
	flex-direction: row;
	flex-wrap: nowrap;
	width: 100%;
}

.my-content > .l > .l1 > .i > .value > .text.color1 {
	font-size: 18px;
}

.my-content > .l > .l1 > .i > .value > .text.color2 {
	color: royalblue;
}

.my-content > .l > .l1 > .i > .value > .text {
	font-size: 24px !important;
	color: #0052cc;
	cursor: pointer;
	transition: all 0.2s;
	width: cacl(100% - 40px);
	display: block;
}

.my-content > .l > .l1 > .i > .value > .text:hover {
	color: #d9007a;
	animation: jelly 0.5s;
}

.my-content > .l > .l1 > .i > .value > .unit {
	font-size: 13px;
	color: #555;
	padding: 0 5px;
	display: flex;
	flex-wrap: nowrap;
	overflow: hidden;
	width: 30px;
	display: block;
}

.my-content > .l > .l2 {
	display: flex;
}

.my-content > .l > .l2 > .image {
	background-color: #eee;
	height: 60px;
	width: 60px;
	border-radius: 70px;
	margin: 0 3px;
}
</style>
