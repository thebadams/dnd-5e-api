const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const Spell = require('../models/Spell');

describe('Spell Schema', () => {
  let mongod
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }).then(() => console.log('Connected To Database'))
  })

  afterAll(async () => {
    await mongoose.disconnect().then(() => console.log('Database Disconnected'))
    await mongod.stop().then(() => console.log('Database Torn Down'))
  })
  describe('Spell Schema Properties', () => {
    let newSpell
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
      test.todo('Should Have A "range" Property');
      test.todo('Should Be The String, "150 feet"')

    });
    describe('Components Property', () => {
      test.todo('Should Have A "components Property"')
      test.todo('Should Be An Object With "v", "s", "m" Properties')
      test.todo('Component "v" Property Should Be "true" Boolean');
      test.todo('Component "s" Property Should Be "true" Boolean');
      test.todo('Component "m" Property Should Be String "a tiny ball of bat guano and sulfur"');
    });
    describe('Duration Property', () => {
      test.todo('Should Have A "duration" Property');
      test.todo('Should Be The String, "Instantaneous"');
    });
    describe('Description Property', () => {
      test.todo('Should Have A "description" Property');
      test.todo('Should Be An Object With "main" and "atHigherLevels" Properties');
      test.todo('Description "main" Property Should Be The String "A Ball of Fire Appears, Doing Fire Damage"')
      test.todo('Description "atHigherLevels" Property Should Be The String "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd."')
    })
    
  })
})