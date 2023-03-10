import {isNumber, isStraight, match0X, matchAB, matchMMDD} from "../utils";
import {main} from "../index";
import {test} from "@jest/globals";

describe('utils test', () => {
	describe('match number pattern test', () => {
		test('is number',()=>{
			const result  = isNumber('087')
			expect(result).toBeTruthy()
		})
		test('is not number',()=>{
			const result  = isNumber('12a2')
			expect(result).toBeFalsy()
		})
	});

	describe('match Straight pattern', () => {
		test('3 Straight',()=>{
			const result = isStraight('123')
			expect(result).toEqual('ABC')
		})
		test('4 Straight',()=>{
			const result = isStraight('2345')
			expect(result).toEqual('ABCD')
		})
		test('5 Straight',()=>{
			const result = isStraight('34567')
			expect(result).toEqual('ABCDE')
		})
		test('6 Straight',()=>{
			const result = isStraight('456789')
			expect(result).toEqual('ABCDEF')
		})
		test('not Straight',()=>{
			const result = isStraight('453789')
			expect(result).toBeUndefined()
		})
	});


	describe('match ABA',()=>{
		test('3D',()=>{
			const result1 = matchAB('033')
			expect(result1).toEqual('ABB')

			const result2 = matchAB('020')
			expect(result2).toEqual('ABA')

			const result3 = matchAB('001')
			expect(result3).toEqual('AAB')
		})

		test('4D',()=>{
			const result1 = matchAB('0111')
			expect(result1).toEqual('ABBB')

			const result2 = matchAB('0033')
			expect(result2).toEqual('AABB')

			const result3 = matchAB('6664')
			expect(result3).toEqual('AAAB')

			const result4 = matchAB('6766')
			expect(result4).toEqual('ABAA')

			const result5 = matchAB('3323')
			expect(result5).toEqual('AABA')

			const result6 = matchAB('3773')
			expect(result6).toEqual('ABBA')

			const result7 = matchAB('0202')
			expect(result7).toEqual('ABAB')

			const result8 = matchAB('7701')
			expect(result8).toEqual('AABC')

			const result9 = matchAB('0855')
			expect(result9).toEqual('ABCC')

			const result10 = matchAB('0446')
			expect(result10).toEqual('ABBC')
		})
		test('5D',()=>{
			const result1 = matchAB('45555')
			expect(result1).toEqual('ABBBB')

			const result2 = matchAB('01234')
			expect(result2).toEqual('ABCDE')

			const result3 = matchAB('00222')
			expect(result3).toEqual('AABBB')

			const result4 = matchAB('22888')
			expect(result4).toEqual('AABBB')

			const result5 = matchAB('55522')
			expect(result5).toEqual('AAABB')

			const result6 = matchAB('22227')
			expect(result6).toEqual('AAAAB')

			const result7 = matchAB('53335')
			expect(result7).toEqual('ABBBA')

			const result8 = matchAB('76777')
			expect(result8).toEqual('ABAAA')

			const result9 = matchAB('77977')
			expect(result9).toEqual('AABAA')

			const result10 = matchAB('77757')
			expect(result10).toEqual('AAABA')
		})
	})

	describe('match0x', () => {
		test('4D',()=>{
			const result1 = match0X('0001')
			expect(result1).toEqual(['0XXX', '00XX', '0X0X'])
		})

		test('6D',()=>{
			const result1 = match0X('888000')
			expect(result1).toEqual(['XXX000'])
		})
	});

	describe('matchMD',()=>{
		test('match',()=>{
			const result = matchMMDD('0311')
			expect(result).toEqual('MMDD')
		})

		test('not match',()=>{
			const result = matchMMDD('1311')
			expect(result).toBeUndefined()
		})
	})

});

describe('main test', () => {

	test('333.bit',()=>{
		const result = main('333.bit')
		expect(result).toMatchObject(new Set(["AAA", "999"]))
	})

	test('2112.bit',()=>{
		const result = main('2112.bit')
		expect(result).toMatchObject(new Set(["ABBA", "10K"]))
	})

	test('45555.bit',()=>{
		const result = main('45555.bit')
		expect(result).toMatchObject(new Set(["ABBBB", "100K"]))
	})

	test('888000.bit',()=>{
		const result = main('888000.bit')
		expect(result).toMatchObject(new Set(["AAABBB", "XXX000"]))
	})

	test('0098.bit',()=>{
		const result = main('0098.bit')
		expect(result).toMatchObject(new Set(["10K", "AABC", "0XXX", "00XX"]))
	})

	test('0x9832.bit',()=>{
		const result = main('0x9832.bit')
		expect(result).toMatchObject(new Set(['0x10K']))
	})

	test('0311.bit',()=>{
		const result = main('0311.bit')
		expect(result).toMatchObject(new Set(["ABCC", "0XXX", "10K", "MMDD"]))
	})
});
