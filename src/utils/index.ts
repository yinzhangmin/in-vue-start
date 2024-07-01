/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
	const search = decodeURIComponent(url.split('?')[1]);
	if (!search) {
		return {}
	}
	const obj = {}
	const searchArr = search.split('&')
	searchArr.forEach(v => {
		const index = v.indexOf('=')
		if (index !== -1) {
			const name = v.substring(0, index)
			const val = v.substring(index + 1, v.length)
			obj[name] = val
		}
	})
	return obj;
}

/**
 * 创建随机数
 */
export const MathUtil = {
	codeChars: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
		'v',
		'w', 'x', 'y', 'z',
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
		'V',
		'W', 'X', 'Y', 'Z'
	],
	getCode: (count) => {
		let c = ''
		for (let i = 0; i < count; i++) {
			c = c + '' + MathUtil.codeChars[MathUtil.getRandomNumber(61, 0)]
		}
		return c
	},
	getRandomNumber: (max, min) => {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
};

/**
 * 返回vue 路由路径
 */
export function routePath() {
	return window.location.href.split('#')[1]
}