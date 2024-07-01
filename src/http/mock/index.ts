const get: Function = () => {
	let result: any = {};
	const mokcs = import.meta.glob('@/http/mock/**/*.*', { eager: true });
	Object.keys(mokcs).forEach((item) => {
		const obj: any = mokcs[item];
		if (obj.default) {
			Object.keys(obj.default).forEach((item) => {
				const mock: any = obj.default[item];
				result[item] = mock.data;
			});
		}
	});
	return result;
};

export default get();
