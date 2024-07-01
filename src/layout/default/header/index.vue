<template>
	<div class="header">
		<div class="left-menu">
			<div class="item">
				<defaultFold />
			</div>
			<div class="item">
				<defaultMore />
			</div>
			<div class="item">
				<defaultBreadcrumb />
			</div>
		</div>
		<div class="right-menu">
			<defaultRight/>
		</div>
	</div>
</template>
<script lang="ts" setup>
import breadcrumb from './breadcrumb/index.vue';
import fold from './fold/index.vue';
import more from './more/index.vue';
import right from './right/index.vue';

var defaultBreadcrumb = breadcrumb;
var defaultFold = fold;
var defaultMore = more;
var defaultRight = right;

</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
