import axios from 'axios'

const service = axios.create({
	baseURL: import.meta.env.VUE_APP_BASE_API,
	timeout: 5000
});

service.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		return Promise.reject(error);
	}
)

service.interceptors.response.use(
	response => {
		const res = response.data;
		if (res.code !== 200) {
			return Promise.reject(new Error(res.message || 'error'))
		} else {
			return res;
		}
	},
	error => {
		return Promise.reject(error);
	}
);
export default service