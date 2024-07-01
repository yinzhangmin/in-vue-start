export default {
	install: (_app: any) => {
		let apis: any = {};
		const result = import.meta.glob('@/http/api/*/*.*', { eager: true });
		Object.keys(result).forEach((item) => {
			const obj: any = result[item];
			if (obj.default) {
				apis[obj.default.name] = obj.default.apis;
			}
		});
		let useStore: any = apiStore();
		useStore['api'] = apis;
	}
};
