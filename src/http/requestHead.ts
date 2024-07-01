import HttpHead from "./httpHead";

export default interface RequestHead extends HttpHead {
	token: string;
	applicationLicense: string;
}