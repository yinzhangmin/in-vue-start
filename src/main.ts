

import { createApp } from 'vue';
import App from './App.vue';
import useInstall from '@/install/index';

import '@/styles/index.scss';


const start = function () {
	const app = createApp(App);
	app.use(useInstall);
	app.mount('#app');
};
start();
