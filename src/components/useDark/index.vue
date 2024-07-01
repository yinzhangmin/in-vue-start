<template>
	<el-menu-item h="full" @click="toggleDark()">
		<button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--ep-menu-item-height)">
			<i inline-flex i="dark:ep-moon ep-sunny" />
		</button>
	</el-menu-item>
</template>

<script setup lang="ts">
	import { toggleDark } from "@/components/useDark/index.ts";
</script>

<style>
</style>