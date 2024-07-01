<template>
	<el-config-provider namespace="ep">
		<Suspense>
			<router-view></router-view>
		</Suspense>
	</el-config-provider>
</template>
