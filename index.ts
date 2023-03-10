import {isNumber, patternsMatch} from "./utils";

export function main(name) {
	if (!name.includes('.')) {
		throw new Error('string cannot be matched')
	}
	//拆分字符串
	const [item] = name.split('.')
	if (!isNumber(item)) {
		throw new Error('not number')
	}

	const results = new Set()
	patternsMatch.forEach(func => {
		const result = func(item)
		if (Array.isArray(result)) {
			result.map(i => results.add(i))
		} else {
			result && results.add(result)
		}
	})
	return results;
}
