import schools from '../../constants/schools';

describe('Schools', () => {
  test('schools should be an Array', () => {
    expect(Array.isArray(schools)).toBeTruthy();
  })
  test('schools should be an array of 8 length', () => {
    expect(schools.length).toBe(8);
  })
  test('schools should have the expected list of school types', () => {
    const expectedArray = ['Conjuration', 'Evocation', 'Necromancy', 'Abjuration', 'Transmutation', 'Divination', 'Enchantment', 'Illusion'];

    expect(schools).toEqual(expect.arrayContaining(expectedArray));

  })
})