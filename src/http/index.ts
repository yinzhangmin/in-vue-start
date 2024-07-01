import request from './request-axios';
import mock from './mock';

const isMock: Boolean = import.meta.env.VITE_API_MOCK || false;

const getMockData = (url: string): Promise<any> => {
	return isMock ? mock[url] : null;
};

const startRequest: Function = async (request: Function, url: string, params: {} = {}, error: any) => {
	return (await getMockData(url)) || request(url, params, error);
};

export const get: Function = async (url: string, params: {} = {}): Promise<any> => {
	return await startRequest(request.get, url, params);
};

export const post: Function = async (url: string, params: {} = {}, error: any): Promise<any> => {
	return await startRequest(request.post, url, params, error);
};

export const http: Function = async (url: string, params: {} = {}, error: any): Promise<any> => {
	return await post(url, params, error);
};

export default http;
