import path from 'path';
export default {
	extensions: ['.js', '.ts', '.vue', '.json', '.jsx', '.tsx'],
	alias: {
		'@': path.resolve(__dirname, '.', '../src')
	}
};
