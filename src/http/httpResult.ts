import HttpHead from './httpHead';


export default interface httpResult<head extends HttpHead> {
	head: head;
	body: any
}

