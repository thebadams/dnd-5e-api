import { levelTuple, LevelEnum } from '../../src/constants/levels';

describe('Schools Enum', () => {
	//console.log(LevelEnum);
	test('Schools Should Be An Enum', () => {
		expect(typeof LevelEnum).toBe('object');
	});
	test('LevelEnum Should Have Property "CANTRIP" That Has The Value, "0"', () => {
		expect(LevelEnum).toHaveProperty('CANTRIP', 0);
	});
	test('LevelEnum Should Have Property "ONE" That Has The Value, "1"', () => {
		expect(LevelEnum).toHaveProperty('ONE', 1);
	});
	test('LevelEnum Should Have Property "TWO" That Has Value, "2"', () => {
		expect(LevelEnum).toHaveProperty('TWO', 2);
	});
	test('LevelEnum Should Have Property "THREE" That Has Value, "3"', () => {
		expect(LevelEnum).toHaveProperty('THREE', 3);
	});
	test('LevelEnum Should Have Property "FOUR" That Has Value, "4"', () => {
		expect(LevelEnum).toHaveProperty('FOUR', 4);
	});
	test('LevelEnum Should Have Property "FIVE" That Has Value, "5"', () => {
		expect(LevelEnum).toHaveProperty('FIVE', 5);
	});
	test('LevelEnum Should Have Property "SIX" That Has Value, "6"', () => {
		expect(LevelEnum).toHaveProperty('SIX', 6);
	});
	test('LevelEnum Should Have Property "SEVEN" That Has Value, "7"', () => {
		expect(LevelEnum).toHaveProperty('SEVEN', 7);
	});
	test('LevelEnum Should Have Property "EIGHT" That Has Value, "8"', () => {
		expect(LevelEnum).toHaveProperty('EIGHT', 8);
	});
	test('LevelEnum Should Have Property "NINE" That Has Value, "9"', () => {
		expect(LevelEnum).toHaveProperty('NINE', 9);
	});
});

describe('Level Tuple', () => {
	test('schools should be an Array', () => {
		expect(Array.isArray(levelTuple)).toBeTruthy();
	});
	test('schools should be an array of 8 length', () => {
		expect(levelTuple.length).toBe(10);
	});
	test('schools should have the expected list of school types', () => {
		const expectedArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

		expect(levelTuple).toEqual(expect.arrayContaining(expectedArray));

	});
});