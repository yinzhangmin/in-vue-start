import path from 'path';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import autoImport from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import Inspect from 'vite-plugin-inspect';

export default () => {
	return [
		vue(),
		autoImport({
			dts: 'src/auto-imports.d.ts',
			imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
			dirs: ['src/store'],
			resolvers: [
				ElementPlusResolver(),
				IconsResolver({
					prefix: 'Icon'
				})
			]
		}),
		createSvgIconsPlugin({
			iconDirs: [path.resolve(process.cwd(), '@src/assets/icons')],
			symbolId: 'icon-[dir]-[name]'
		}),
		components({
			dts: 'src/components.d.ts',
			dirs: ['src/components/**/', 'src/html/index'],
			extensions: ['vue', 'tsx', 'jsx'],
			deep: true,
			resolvers: [
				ElementPlusResolver({ importStyle: 'sass' }),
				IconsResolver({
					enabledCollections: ['ep','ant-design']
				})
			]
		}),
		Icons({
			autoInstall: true
		}),
		Inspect()
	];
};
