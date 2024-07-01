import resize from './resizeObserver';
import waterMark from './waterMark';
// 自定义指令集合
const directives: any = {
	resize,
	waterMark
};

export default {
	install(Vue: any) {
		Object.keys(directives).forEach((key) => {
			Vue.directive(key, directives[key]);
		});
	}
};
