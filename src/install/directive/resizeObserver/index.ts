const map = new WeakMap();
const ob = new ResizeObserver((entries) => {
	for (const entry of entries) {
		const handler = map.get(entry.target);
		if (handler) {
			handler({
				width: entry.borderBoxSize[0].inlineSize,
				height: entry.borderBoxSize[0].blockSize
			});
		}
	}
});
export default {
	mounted(el: any, binding: any) {
		map.set(el, binding.value);
		ob.observe(el);
	},
	unmounted(el: any) {
		ob.unobserve(el);
	}
};
