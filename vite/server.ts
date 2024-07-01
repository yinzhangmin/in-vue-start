export default (env: any): any => {
	return {
		host: '0.0.0.0',
		port: env.VITE_PORT,
		proxy: {
			'/server-api': {
				target: env.VITE_API_URL,
				changeOrigin: true,
				rewrite: (path: string) => path.replace(/^\/api/, '')
			}
		}
	};
};
