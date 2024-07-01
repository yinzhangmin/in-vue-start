import HttpHead from "./httpHead";

export default interface ResponseHead extends HttpHead {
	code: string;
	message: string;
}