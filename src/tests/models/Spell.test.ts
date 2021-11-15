import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Spell, {ISpell, IComponents, IDescription} from '../../models/Spell';

describe('Spell Schema', () => {
	let mongod : MongoMemoryServer;
	beforeAll(async () => {
		mongod = await MongoMemoryServer.create();
		const uri = mongod.getUri();
		// const connectOptions = {
		//   useUnifiedTopology: true,
		//   useNewUrlParser: true
		// }
		await mongoose.connect(uri).then(() => console.log('Connected To Database'));
	});

	afterAll(async () => {
		await mongoose.disconnect().then(() => console.log('Database Disconnected'));
		await mongod.stop().then(() => console.log('Database Torn Down'));
	});
	describe('Spell Schema Properties', () => {
		let newSpell: ISpell;
		beforeAll(async () => {
			const components: IComponents = {
				v: true,
				s: true,
				m: 'a tiny ball of bat guano and sulfur'
			};
			const description: IDescription = {
				main: 'A Ball of Fire Appears, Doing Fire Damage',
				atHigherLevels: 'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.'
			};
			const spellInfo: ISpell = {
				name: 'Fireball',
				level: 3,
				school: 'Evocation',
				castingTime: '1 Action',
				range: '150 Ft',
				components,
				duration: 'Instantaneous',
				description,
				concentration: false,
				ritual: false
			};
			newSpell = await Spell.create(spellInfo);
			console.log(newSpell);
		});
		it('Should Have An _id Property', () => {
			expect(newSpell).toHaveProperty('_id');
		});
		describe('Name Property', () => {
			it('Should Have A "name" Property', () => {
				expect(newSpell).toHaveProperty('name');
			});
			it('Should Be Fireball', () => {
				expect(typeof newSpell.name).toBe('string');
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
				expect(typeof newSpell.school).toBe('string');
				expect(newSpell.school).toBe('Evocation');
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
				expect(typeof newSpell.range).toBe('string');
				expect(newSpell.range).toBe('150 Ft');
			});

		});
		describe('Components Property', () => {
			it('Should Have A "components Property"', () => {
				expect(newSpell).toHaveProperty('components');
			});
			it('Should Be An Object With "v", "s", "m" Properties', () => {
				expect(typeof newSpell.components).toBe('object');
				expect(newSpell.components).toHaveProperty('v');
				expect(newSpell.components).toHaveProperty('s');
				expect(newSpell.components).toHaveProperty('m');
			});
			test('Component "v" Property Should Be "true" Boolean', () => {
				const { components: {v} } = newSpell;
				expect(typeof v).toBe('boolean');
				expect(v).toBe(true);
			});
			test('Component "s" Property Should Be "true" Boolean', () => {
				const { components: {s} } = newSpell;
				expect(typeof s).toBe('boolean');
				expect(s).toBe(true);
			});
			test('Component "m" Property Should Be String "a tiny ball of bat guano and sulfur"', () => {
				const { components: {m} } = newSpell;
				expect(typeof m).toBe('string');
				expect(m).toBe('a tiny ball of bat guano and sulfur');
			});
		});
		describe('Duration Property', () => {
			it('Should Have A "duration" Property', () => {
				expect(newSpell).toHaveProperty('duration');
			});
			it('Should Be The String, "Instantaneous"', () => {
				expect(typeof newSpell.duration).toBe('string');
				expect(newSpell.duration).toBe('Instantaneous');
			});
		});
		describe('Description Property', () => {
			it('Should Have A "description" Property', () => {
				expect(newSpell).toHaveProperty('description');
			});
			it('Should Be An Object With "main" and "atHigherLevels" Properties', () => {
				const { description } = newSpell;
				expect(typeof description).toBe('object');
				expect(description).toHaveProperty('main');
				expect(description).toHaveProperty('atHigherLevels');
			});
			test('Description "main" Property Should Be The String "A Ball of Fire Appears, Doing Fire Damage"', () => {
				const { description: { main }} = newSpell;
				expect(typeof main).toBe('string');
				expect(main).toBe('A Ball of Fire Appears, Doing Fire Damage');
			});
			test('Description "atHigherLevels" Property Should Be The String "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd."', () => {
				const { description: { atHigherLevels }} = newSpell;
				expect(typeof atHigherLevels).toBe('string');
				expect(atHigherLevels).toBe('When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.');
			});
		});
		describe('Concentration Property', () => {
			test('New Spell Should Have A Property, "concentration", and it should be the value, "false"', () => {
				expect(newSpell).toHaveProperty('concentration', false);
			});
		});
		describe('Ritual Property', () => {
			test('New Spell Should Have a Property, "ritual", and it should be the value, "false"', () => {
				expect(newSpell).toHaveProperty('ritual', false);
			});
		});
    
	});
	describe('Spell Model Validation', () => {
		describe('Name Validation', () => {
			let badSpell: mongoose.Error.ValidationError;
			beforeAll(async () => {
				const components = {
					v: true,
					s: true,
					m: 'bat guano and sulfur'
				};

				const description = {
					main: 'A Ball of Fire Appears, Doing Fire Damage',
					atHigherLevels: 'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.'
				};
				const badSpellInfo = {
					level: 3,
					school: 'Evocation',
					castingTime: '1 Action',
					range: '150 Ft',
					components,
					duration: 'Instantaneous',
					description
				};


				badSpell = await Spell.create(badSpellInfo).catch((e) => e);
				
				
			});
			test('Spell Name Is Required; If None Is Passed In, Throw Error', () => {
				expect(badSpell).toBeInstanceOf(mongoose.Error.ValidationError);
			});
			test('Spell Name Reqired; Validation Message Is "Name Must Be Provided"', () => {
				const expected  = {
					properties: expect.objectContaining({message: 'Name Must Be Provided', type: 'required', path: 'name'}
					),
					kind: 'required',
					path: 'name'
				};
				expect(badSpell).toHaveProperty('errors');
				expect(badSpell.errors).toHaveProperty('name', expect.objectContaining(expected));
        
			});
		});
		describe('Level Validation', () => {
			test.todo('Spell Level Is Required; If One Is Not Passed In And Error Should Be Thrown');
			test.todo('If No Spell Level Is Passed In Return With An Error Message');
			test.todo('If A Spell Level, Not Of Numbers 0-9 Are Passed In, Throw A Validation Error');
		});
		describe('School Validation', () => {
			test.todo('School Is Required, If None Is Passed In, Throw An Error');
			test.todo('If no school is passed in, Validation Error Should Be Thrown');
			test.todo('If School Is Not One of The Enums, Throw A Validation Error');
		});
		describe('Casting Time Validation', () => {
			test.todo('Casting Time Is Required; If None Is Provided, Throw An error,');
			test.todo('If No Casting Time Is Provided, Throw a Validation Error');
		});
		describe('Range Validation', () => {
			test.todo('Range Is Required; If None Is Passed In Expect An Error');
			test.todo('If No Range Is Passed In, Return A Validation Error');
		});
		describe('Components Validation', () => {
			test.todo('Components Are Required; If None Is Provided, Expect An Error');
			test.todo('If No Component Is Passed In, Throw A Validation Error');
		});
		describe('Duration Validation', () => {
			test.todo('Duration Is Required; If None Is Provided Throw An error');
			test.todo('If No duration is provided, expect a Validation error');
		});
		describe('Description Validation', () => {
			test.todo('Description Is Required; If None Is Provided, Expect An error');
			test.todo('If No Description Is Provided, Expect A Validation Error');
		});
		describe('Concentration Validation', () => {
			test.todo('Concentration Is Required, If None Is provided, Throw An Error');
			test.todo('Expect a validation error if no concentration value is provided');
		});
		describe('Ritual Validation', () => {
			test.todo('Ritual Is Required, IF none is provided, trow an Error');
			test.todo('Expect a validation error if no concentration valude is provided');
		});
	});
});