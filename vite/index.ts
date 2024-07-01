import { defineConfig, loadEnv } from 'vite';

import server from './server';
import plugins from './plugins';
import resolve from './resolve';
import css from './css';

const strat: Function = () => {
	return defineConfig(({ mode }) => {
		const env: any = loadEnv(mode, process.cwd());
		return { server: server(env), plugins: plugins(), resolve, css, base: '/' };
	});
};
export default {
	strat
};
