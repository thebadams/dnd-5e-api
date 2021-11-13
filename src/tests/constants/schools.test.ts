import {SchoolsEnum, schoolsTuple} from '../../constants/schools';

describe('Schools Enum', () => {
  console.log(SchoolsEnum)
  test('Schools Should Be An Enum', () => {
    expect(typeof SchoolsEnum).toBe('object');
  })
  test('Schools Should Have Property "EVOCATION" That Has The Value, "Evocation"', () => {
    expect(SchoolsEnum).toHaveProperty('EVOCATION', 'Evocation');
  })
  test('Schools Should Have Property "CONJURATION" That Has The Value, "Conjuration"', () => {
    expect(SchoolsEnum).toHaveProperty('CONJURATION', 'Conjuration');
  })
  test('Schools Should Have Property "NECROMANCY" That Has Value, "Necromancy"', () => {
    expect(SchoolsEnum).toHaveProperty('NECROMANCY', 'Necromancy');
  })
  test('Schools Should Have Property "ABJURATION" That Has Value, "Abjuration"', () => {
    expect(SchoolsEnum).toHaveProperty('ABJURATION', 'Abjuration');
  });
  test('Schools Should Have Property "TRANSMUTATION" That Has Value, "Transmutation"', () => {
    expect(SchoolsEnum).toHaveProperty('TRANSMUTATION', 'Transmutation');
  });
  test('Schools Should Have Property "DIVINATION" That Has Value, "Divination"', () => {
    expect(SchoolsEnum).toHaveProperty('DIVINATION', 'Divination');
  });
  test('Schools Should Have Property "ENCHANTMENT" That Has Value, "Enchantment"', () => {
    expect(SchoolsEnum).toHaveProperty('ENCHANTMENT', 'Enchantment');
  });
  test('Schools Should Have Property "ILLUSION" That Has Value, "Illusion"', () => {
    expect(SchoolsEnum).toHaveProperty('ILLUSION', 'Illusion');
  })
})

describe('Schools Tuple', () => {
  test('schools should be an Array', () => {
    expect(Array.isArray(schoolsTuple)).toBeTruthy();
  })
  test('schools should be an array of 8 length', () => {
    expect(schoolsTuple.length).toBe(8);
  })
  test('schools should have the expected list of school types', () => {
    const expectedArray = ['Conjuration', 'Evocation', 'Necromancy', 'Abjuration', 'Transmutation', 'Divination', 'Enchantment', 'Illusion'];

    expect(schoolsTuple).toEqual(expect.arrayContaining(expectedArray));

  })
})