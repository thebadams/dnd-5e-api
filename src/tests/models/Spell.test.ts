import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import Spell, {spellInterface} from '../../models/Spell';

describe('Spell Schema', () => {
  let mongod : MongoMemoryServer
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    // const connectOptions = {
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true
    // }
    await mongoose.connect(uri).then(() => console.log('Connected To Database'))
  })

  afterAll(async () => {
    await mongoose.disconnect().then(() => console.log('Database Disconnected'))
    await mongod.stop().then(() => console.log('Database Torn Down'))
  })
  describe('Spell Schema Properties', () => {
    let newSpell: spellInterface
    beforeAll(async () => {
      const components = {
        v: true,
        s: true,
        m: 'a tiny ball of bat guano and sulfur'
      }
      const description = {
        main: `A Ball of Fire Appears, Doing Fire Damage`,
        atHigherLevels: 'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.'
      }
      const spellInfo = {
        name: 'Fireball',
        level: 3,
        school: 'Evocation',
        castingTime: '1 Action',
        range: '150 Ft',
        components,
        duration: 'Instantaneous',
        description
      }
      newSpell = await Spell.create(spellInfo)
      console.log(newSpell)
    })
    it('Should Have An _id Property', () => {
      expect(newSpell).toHaveProperty('_id')
    })
    describe('Name Property', () => {
      it('Should Have A "name" Property', () => {
      expect(newSpell).toHaveProperty('name')
    });
      it('Should Be Fireball', () => {
        expect(typeof newSpell.name).toBe('string')
        expect(newSpell.name).toBe('Fireball');
      });
    });
    describe('Level Property', () => {
      it('Should Have A "level" Property', () => {
        expect(newSpell).toHaveProperty('level');
      });
      it('Should Be The Number "3"', () => {
        expect(typeof newSpell.level).toBe('number');
        expect(newSpell.level).toBe(3);
      });
    });
    describe('School Property', () => {
      it('Should Have A "school" Property', () => {
        expect(newSpell).toHaveProperty('school');
      });
      it('Should Be The String, "Evocation"', () => {
        expect(typeof newSpell.school).toBe('string')
        expect(newSpell.school).toBe('Evocation')
      });
    });
    describe('Casting Time Property', () => {
      it('Should Have A "castingTime" Property', () => {
        expect(newSpell).toHaveProperty('castingTime');
      });
      it('Should Be The String, "1 Action"', () => {
        expect(typeof newSpell.castingTime).toBe('string');
        expect(newSpell.castingTime).toBe('1 Action');
      });
    });
    describe('Range Property', () => {
      it('Should Have A "range" Property', () => {
        expect(newSpell).toHaveProperty('range');
      });
      it('Should Be The String, "150 Ft"', () => {
        expect(typeof newSpell.range).toBe('string')
        expect(newSpell.range).toBe('150 Ft')
      })

    });
    describe('Components Property', () => {
      it('Should Have A "components Property"', () => {
        expect(newSpell).toHaveProperty('components');
      })
      it('Should Be An Object With "v", "s", "m" Properties', () => {
        expect(typeof newSpell.components).toBe('object');
        expect(newSpell.components).toHaveProperty('v');
        expect(newSpell.components).toHaveProperty('s');
        expect(newSpell.components).toHaveProperty('m');
      })
      test('Component "v" Property Should Be "true" Boolean', () => {
        const { components: {v} } = newSpell;
        expect(typeof v).toBe('boolean')
        expect(v).toBe(true)
      });
      test('Component "s" Property Should Be "true" Boolean', () => {
        const { components: {s} } = newSpell
        expect(typeof s).toBe('boolean')
        expect(s).toBe(true);
      });
      test('Component "m" Property Should Be String "a tiny ball of bat guano and sulfur"', () => {
        const { components: {m} } = newSpell
        expect(typeof m).toBe('string')
        expect(m).toBe('a tiny ball of bat guano and sulfur');
      });
    });
    describe('Duration Property', () => {
      it('Should Have A "duration" Property', () => {
        expect(newSpell).toHaveProperty('duration');
      });
      it('Should Be The String, "Instantaneous"', () => {
        expect(typeof newSpell.duration).toBe('string');
        expect(newSpell.duration).toBe('Instantaneous')
      });
    });
    describe('Description Property', () => {
      it('Should Have A "description" Property', () => {
        expect(newSpell).toHaveProperty('description');
      });
      it('Should Be An Object With "main" and "atHigherLevels" Properties', () => {
        const { description } = newSpell
        expect(typeof description).toBe('object');
        expect(description).toHaveProperty('main');
        expect(description).toHaveProperty('atHigherLevels');
      });
      test('Description "main" Property Should Be The String "A Ball of Fire Appears, Doing Fire Damage"', () => {
        const { description: { main }} = newSpell;
        expect(typeof main).toBe('string');
        expect(main).toBe('A Ball of Fire Appears, Doing Fire Damage');
      })
      test('Description "atHigherLevels" Property Should Be The String "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd."', () => {
        const { description: { atHigherLevels }} = newSpell;
        expect(typeof atHigherLevels).toBe('string');
        expect(atHigherLevels).toBe('When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.')
      })
    })
    
  })
  describe('Spell Model Validation', () => {
    test('Spell Name Is Required; If None Is Passed In, Throw Error', () => {
      return expect(async () => {
        const components = {
          v: true,
          s: true,
          m: 'bat guano and sulfur'
        }

        const description = {
          main: `A Ball of Fire Appears, Doing Fire Damage`,
          atHigherLevels: 'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.'
        }
        const badSpellInfo = {
          level: 3,
          school: 'Evocation',
          castingTime: '1 Action',
          range: '150 Ft',
          components,
          duration: 'Instantaneous',
          description
        }

        
          await Spell.create(badSpellInfo)
        
      }).rejects.toBeInstanceOf(mongoose.Error.ValidationError);
    })
  })
})