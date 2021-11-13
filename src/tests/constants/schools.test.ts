import Schools from '../../constants/schools';

describe('Schools Enum', () => {
  console.log(Schools)
  test('Schools Should Be An Enum', () => {
    expect(typeof Schools).toBe('object');
  })
  test('Schools Should Have Property "EVOCATION" That Has The Value, "Evocation"', () => {
    expect(Schools).toHaveProperty('EVOCATION', 'Evocation');
  })
  test('Schools Should Have Property "CONJURATION" That Has The Value, "Conjuration"', () => {
    expect(Schools).toHaveProperty('CONJURATION', 'Conjuration');
  })
  test('Schools Should Have Property "NECROMANCY" That Has Value, "Necromancy"', () => {
    expect(Schools).toHaveProperty('NECROMANCY', 'Necromancy');
  })
  test('Schools Should Have Property "ABJURATION" That Has Value, "Abjuration"', () => {
    expect(Schools).toHaveProperty('ABJURATION', 'Abjuration');
  });
  test('Schools Should Have Property "TRANSMUTATION" That Has Value, "Transmutation"', () => {
    expect(Schools).toHaveProperty('TRANSMUTATION', 'Transmutation');
  });
  test('Schools Should Have Property "DIVINATION" That Has Value, "Divination"', () => {
    expect(Schools).toHaveProperty('DIVINATION', 'Divination');
  });
  test('Schools Should Have Property "ENCHANTMENT" That Has Value, "Enchantment"', () => {
    expect(Schools).toHaveProperty('ENCHANTMENT', 'Enchantment');
  });
  test('Schools Should Have Property "ILLUSION" That Has Value, "Illusion"', () => {
    expect(Schools).toHaveProperty('ILLUSION', 'Illusion');
  })

  // test('schools should be an Array', () => {
  //   expect(Array.isArray(schools)).toBeTruthy();
  // })
  // test('schools should be an array of 8 length', () => {
  //   expect(schools.length).toBe(8);
  // })
  // test('schools should have the expected list of school types', () => {
  //   const expectedArray = ['Conjuration', 'Evocation', 'Necromancy', 'Abjuration', 'Transmutation', 'Divination', 'Enchantment', 'Illusion'];

  //   expect(schools).toEqual(expect.arrayContaining(expectedArray));

  // })
})