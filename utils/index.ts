export function isNumber(item) {
	const pattern = /[^0-9|0x]/
	const result = pattern.test(item)
	return !result
}

/**
 * 只要是3-5位数字就会命中的规则
 * @param item
 */
export function matchNumber(item) {
	switch (item.length) {
		case 3:
			return '999'
		case 4:
			return '10K'
		case 5:
			return '100K'
	}
}

/**
 * 判断是否为顺子
 * ABC
 * ABCD
 * ....
 * @param name
 */
export function isStraight(name) {
	const length = name.length
	const pattern = new RegExp("^(0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)){2,5}\\d$")
	const result = pattern.test(name)
	if (result) {
		switch (length) {
			case 3:
				return 'ABC'
			case 4:
				return 'ABCD'
			case 5:
				return 'ABCDE'
			case 6:
				return 'ABCDEF'
		}
	}
}


export function match0x(name) {
	const pattern = /^0x[0-9]{1,5}/
	const result = pattern.test(name)
	if (result && name.length <= 5) {
		return `0x${new Array(name.length - 2).fill(9).join('')}`
	}
	if (result && name.length == 6) {
		return '0x10K'
	}
}

export function matchHex(name) {
	const pattern = /^0x[0-9a-f]{1,2}/
	const result = pattern.test(name)
	if (result && name.length <= 5) {
		return `${name.length - 2}Hex`
	}
}


/**
 *
 * @param name
 */
export function matchAB(name) {
	const result = []
	const resultMap = {
		0: 'A',
		1: 'B',
		2: 'C',
		3: 'D',
		4: 'E'
	}
	let resultMapIndex = 0
	//当前结果
	let currentRes = ''

	for (let i = 0; i < name.length; i++) {
		const cur = name[i]

		//判断数字是否出现过
		const resultExistIndex = name.substring(0, i).indexOf(cur)

		//如果出现过直接使用已经出现过的数字对应的字母
		if (resultExistIndex !== -1) {
			currentRes = result[resultExistIndex]
		} else {
			currentRes = resultMap[resultMapIndex]
			resultMapIndex = resultMapIndex + 1
		}
		result.push(currentRes)

	}

	return result.join('');
}

export function match0X (name){
	if (name.length <= 3) {
		return;
	}
	const patterns = {
		4: ['0XXX', '00XX', '0X0X', '0XX0', 'XX00'],
		5: ['XX000', '00XX0', '000XX', '00XXX', 'XXX00'],
		6: ['00XX00', 'XXX000', '000XXX']
	}
	const rules = patterns[name.length]
	return rules.filter(rule => {
		let n = 0
		let isMatch = true;
		while (n <= name.length) {
			const mustBe0 = rule[n] === '0'
			const cur = name[n]
			if (mustBe0 && cur !== '0') {
				isMatch = false;
				break;
			}
			n++
		}
		return !!isMatch
	});
}

export function matchMMDD(name){
	const pattern= /^((0[1-9])|(1[0-2]))((0[1-9])|((1|2)[0-9])|(3[0-1]))$/;
	const result = pattern.test(name)
	if (result){
		return 'MMDD'
	}
}

export const patternsMatch = [isStraight, matchNumber, match0X, matchHex, matchAB,matchMMDD]
