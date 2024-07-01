import CryptoJS from 'crypto-js';

const getDayValue = function () {
	let now = new Date();
	let day = now.getDate();
	return day > 9 ? day : '0' + day;
};

const cryptoObj = {
	encryptFunc: (message: String) => {
		const timestamp = new Date().getTime();
		const key = 'UE' + getDayValue() + 'LvIW12YxRyzTlVfAz0==';
		const keyHex = CryptoJS.enc.Utf8.parse(key);
		const encrypted = CryptoJS.AES.encrypt(message + '-' + timestamp, keyHex, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		});
		return encrypted.toString();
	}
};
export default cryptoObj;
