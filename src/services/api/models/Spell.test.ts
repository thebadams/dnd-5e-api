import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Spell, {ISpell, IComponents, IDescription} from './Spell';
import {LevelEnum} from '../../../constants/levels/levels';
import { SchoolsEnum } from '../../../constants/schools/schools';

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
				level: LevelEnum.THREE,
				school: SchoolsEnum.EVOCATION,
				castingTime: '1 Action',
				range: '150 Ft',
				components,
				duration: 'Instantaneous',
				description,
				concentration: false,
				ritual: false
			};
			newSpell = await Spell.create(spellInfo);
			//console.log(newSpell);
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
				const components : IComponents = {
					v: true,
					s: true,
					m: 'bat guano and sulfur'
				};

				const description : IDescription = {
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
					description,
					concentration: false,
					ritual: false
				};


				badSpell = await Spell.create(badSpellInfo).catch((e) => e);
				
				
			});
			test('Spell Name Is Required; If None Is Passed In, Throw Error', () => {
				expect(badSpell).toBeInstanceOf(mongoose.Error.ValidationError);
			});
			test('Spell Name Reqired; Validation Message Is "Name Must Be Provided"', () => {
				const expected  = {
					name: expect.objectContaining({
						properties: expect.objectContaining({ message: 'Name Must Be Provided', type: 'required', path: 'name' }
						),
						kind: 'required',
						path: 'name'
					})
					
				};
				expect(badSpell).toHaveProperty('errors', expect.objectContaining(expected));
        
			});
		});
		describe('Level Validation', () => {
			let badSpell: mongoose.Error.ValidationError;
			let badSpellLevel: mongoose.Error.ValidationError;
			beforeAll(async () => {
				const components: IComponents = {
					v: true,
					s: true,
					m: 'bat guano and sulfur'
				};

				const description: IDescription = {
					main: 'A Ball of Fire Appears, Doing Fire Damage',
					atHigherLevels: 'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.'
				};
				const badSpellInfo = {
					name: 'Fireball',
					// level: 3,
					school: 'Evocation',
					castingTime: '1 Action',
					range: '150 Ft',
					components,
					duration: 'Instantaneous',
					description,
					concentration: false,
					ritual: false
				};
				const badSpellLevelInfo = {
					...badSpellInfo, level: 10
				};


				badSpell = await Spell.create(badSpellInfo).catch((e) => e);
				badSpellLevel = await Spell.create(badSpellLevelInfo).catch((e) => e);
				//console.log(badSpellLevel.errors);
				//console.log(badSpell);


			});
			test('Spell Level Is Required; If One Is Not Passed In And Error Should Be Thrown', () => {
				expect(badSpell).toBeInstanceOf(mongoose.Error.ValidationError);
			});
			test('If No Spell Level Is Passed In Return With An Error Message', () => {
				const expected = {
					level: expect.objectContaining({
						properties: expect.objectContaining({ message: 'Level Must Be Provided', type: 'required', path: 'level' }
						),
						kind: 'required',
						path: 'level'
					})

				};
				expect(badSpell).toHaveProperty('errors', expect.objectContaining(expected));
			});
			test('If A Spell Level, Not Of Numbers 0-9 Are Passed In, Throw A Validation Error', () => {
				expect(badSpellLevel).toBeInstanceOf(mongoose.Error.ValidationError);
			});
			test('If A Spell Level Error Is Thrown, Message Should Be "10 Is Not A Valid Spell Level"', () => {
				const expected = {
					level: expect.objectContaining({
						properties: expect.objectContaining({
							message: '10 Is Not A Valid Spell Level',
							type: 'enum',
							path: 'level'
						}),
						kind: 'enum',
						path: 'level'
					})
				};
				expect(badSpellLevel).toHaveProperty('errors', expect.objectContaining(expected));
			});
		});
		describe('School Validation', () => {
			let badSpell : mongoose.Error.ValidationError;
			let badSpellSchool: mongoose.Error.ValidationError;
			beforeAll(async () => {
				const components: IComponents = {
					v: true,
					s: true,
					m: 'bat guano and sulfur'
				};

				const description: IDescription = {
					main: 'A Ball of Fire Appears, Doing Fire Damage',
					atHigherLevels: 'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.'
				};
				const badSpellInfo = {
					name: 'Fireball',
					level: 3,
					//school: 'Evocation',
					castingTime: '1 Action',
					range: '150 Ft',
					components,
					duration: 'Instantaneous',
					description,
					ritual: false,
					concentration: false
				};
				const badSpellSchoolInfo = {
					...badSpellInfo, school: 'Evo'
				};


				badSpell = await Spell.create(badSpellInfo).catch((e) => e);
				badSpellSchool = await Spell.create(badSpellSchoolInfo).catch((e) => e);
				//console.log(badSpellLevel.errors);
				//console.log(badSpell);


			});
			test('School Is Required, If None Is Passed In, Throw An Error', () => {
				expect(badSpell).toBeInstanceOf(mongoose.Error.ValidationError);
			});
			test('If No School Is Pass In, the Error Message Should Be "Spell School Is Required"', () => {
				const expected = {
					school: expect.objectContaining({
						properties: expect.objectContaining({ message: 'School Must Be Provided', type: 'required', path: 'school' }
						),
						kind: 'required',
						path: 'school'
					})

				};
				expect(badSpell).toHaveProperty('errors', expect.objectContaining(expected));
			});
			test('If A Wrong Spell School Is Provided, Throw A Validation Error', () => {
				expect(badSpellSchool).toBeInstanceOf(mongoose.Error.ValidationError);
			});
			test('If School Is Provided Value, "Evo", Message Should Be "Evo Is Not A Valid Spell School"', () => {
				const expected = {
					school: expect.objectContaining({
						properties: expect.objectContaining({ message: 'Evo Is Not A Valid Spell School', type: 'enum', path: 'school' }
						),
						kind: 'enum',
						path: 'school'
					})

				};
				expect(badSpellSchool).toHaveProperty('errors', expect.objectContaining(expected));
			});
		});
		describe('Casting Time Validation', () => {
			let badSpell: mongoose.Error.ValidationError;
			beforeAll(async () => {
				const components: IComponents = {
					v: true,
					s: true,
					m: 'bat guano and sulfur'
				};

				const description: IDescription = {
					main: 'A Ball of Fire Appears, Doing Fire Damage',
					atHigherLevels: 'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.'
				};
				const badSpellInfo = {
					name: 'Fireball',
					level: 3,
					school: 'Evocation',
					//castingTime: '1 Action',
					range: '150 Ft',
					components,
					duration: 'Instantaneous',
					description
				};


				badSpell = await Spell.create(badSpellInfo).catch((e) => e);
				//console.log(badSpellLevel.errors);
				//console.log(badSpell);


			});
			test('Casting Time Is Required; If None Is Provided, Throw An error', () => {
				expect(badSpell).toBeInstanceOf(mongoose.Error.ValidationError);
			});
			test('If No Casting Time Is Provided, Message Should Be "Casting Time Must Be Provided"', () => {
				const expected = {
					castingTime: expect.objectContaining({
						properties: expect.objectContaining({ message: 'Casting Time Must Be Provided', type: 'required', path: 'castingTime' }
						),
						kind: 'required',
						path: 'castingTime'
					})

				};
				expect(badSpell).toHaveProperty('errors', expect.objectContaining(expected));
			});
		});
		describe('Range Validation', () => {
			let badSpell: mongoose.Error.ValidationError;
			beforeAll(async () => {
				const components: IComponents = {
					v: true,
					s: true,
					m: 'bat guano and sulfur'
				};

				const description: IDescription = {
					main: 'A Ball of Fire Appears, Doing Fire Damage',
					atHigherLevels: 'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.'
				};
				const badSpellInfo = {
					name: 'Fireball',
					level: 3,
					school: 'Evocation',
					castingTime: '1 Action',
					//range: '150 Ft',
					components,
					duration: 'Instantaneous',
					description
				};


				badSpell = await Spell.create(badSpellInfo).catch((e) => e);
				//console.log(badSpellLevel.errors);
				//console.log(badSpell);


			});
			test('Range Is Required; If None Is Provided, Throw An error', () => {
				expect(badSpell).toBeInstanceOf(mongoose.Error.ValidationError);
			});
			test('If No Range Is Provided, Message Should Be "Casting Time Must Be Provided"', () => {
				const expected = {
					range: expect.objectContaining({
						properties: expect.objectContaining({ message: 'Range Must Be Provided', type: 'required', path: 'range' }
						),
						kind: 'required',
						path: 'range'
					})

				};
				expect(badSpell).toHaveProperty('errors', expect.objectContaining(expected));
			});
		});
		describe('Range Validation', () => {
			let badSpell: mongoose.Error.ValidationError;
			beforeAll(async () => {
				// const components: IComponents = {
				// 	v: true,
				// 	s: true,
				// 	m: 'bat guano and sulfur'
				// };

				const description: IDescription = {
					main: 'A Ball of Fire Appears, Doing Fire Damage',
					atHigherLevels: 'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.'
				};
				const badSpellInfo = {
					name: 'Fireball',
					level: 3,
					school: 'Evocation',
					castingTime: '1 Action',
					range: '150 Ft',
					//components,
					duration: 'Instantaneous',
					description,
					concentration: false,
					ritual: false
				};


				badSpell = await Spell.create(badSpellInfo).catch((e) => e);
				//console.log(badSpellLevel.errors);
				//console.log(badSpell);


			});
			test('Range Is Required; If None Is Provided, Throw An error', () => {
				expect(badSpell).toBeInstanceOf(mongoose.Error.ValidationError);
			});
			test('If No Components Are Provided, Message Should Be "Components Must Be Provided"', () => {
				const expected = {
					components: expect.objectContaining({
						properties: expect.objectContaining({ message: 'Components Must Be Provided', type: 'required', path: 'components' }
						),
						kind: 'required',
						path: 'components'
					})

				};
				expect(badSpell).toHaveProperty('errors', expect.objectContaining(expected));
			});
		});
		describe('Duration Validation', () => {
			let badSpell: mongoose.Error.ValidationError;
			beforeAll(async () => {
				const components: IComponents = {
					v: true,
					s: true,
					m: 'bat guano and sulfur'
				};

				const description: IDescription = {
					main: 'A Ball of Fire Appears, Doing Fire Damage',
					atHigherLevels: 'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.'
				};
				const badSpellInfo = {
					name: 'Fireball',
					level: 3,
					school: 'Evocation',
					castingTime: '1 Action',
					range: '150 Ft',
					components,
					//duration: 'Instantaneous',
					description,
					concentration: false,
					ritual: false
				};


				badSpell = await Spell.create(badSpellInfo).catch((e) => e);
				//console.log(badSpellLevel.errors);
				//console.log(badSpell);


			});
			test('Duration Is Required; If None Is Provided, Throw An error', () => {
				expect(badSpell).toBeInstanceOf(mongoose.Error.ValidationError);
			});
			test('If No Duration Is Provided, Message Should Be "Duration Must Be Provided"', () => {
				const expected = {
					duration: expect.objectContaining({
						properties: expect.objectContaining({ message: 'Duration Must Be Provided', type: 'required', path: 'duration' }
						),
						kind: 'required',
						path: 'duration'
					})

				};
				expect(badSpell).toHaveProperty('errors', expect.objectContaining(expected));
			});
		});
		describe('Description Validation', () => {
			let badSpell: mongoose.Error.ValidationError;
			beforeAll(async () => {
				const components: IComponents = {
					v: true,
					s: true,
					m: 'bat guano and sulfur'
				};

				// const description: IDescription = {
				// 	main: 'A Ball of Fire Appears, Doing Fire Damage',
				// 	atHigherLevels: 'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.'
				// };
				const badSpellInfo = {
					name: 'Fireball',
					level: 3,
					school: 'Evocation',
					castingTime: '1 Action',
					range: '150 Ft',
					components,
					duration: 'Instantaneous',
					//description,
					ritual: false,
					concentration: false
				};


				badSpell = await Spell.create(badSpellInfo).catch((e) => e);
				//console.log(badSpellLevel.errors);
				//console.log(badSpell);


			});
			test('Description Is Required; If None Is Provided, Throw An error', () => {
				expect(badSpell).toBeInstanceOf(mongoose.Error.ValidationError);
			});
			test('If No Description Is Provided, Message Should Be "Description Must Be Provided"', () => {
				const expected = {
					description: expect.objectContaining({
						properties: expect.objectContaining({ message: 'Description Must Be Provided', type: 'required', path: 'description' }
						),
						kind: 'required',
						path: 'description'
					})

				};
				expect(badSpell).toHaveProperty('errors', expect.objectContaining(expected));
			});
		});
		describe('Concentration Validation', () => {
			let badSpell: mongoose.Error.ValidationError;
			beforeAll(async () => {
				const components: IComponents = {
					v: true,
					s: true,
					m: 'bat guano and sulfur'
				};

				const description: IDescription = {
					main: 'A Ball of Fire Appears, Doing Fire Damage',
					atHigherLevels: 'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.'
				};
				const badSpellInfo = {
					name: 'Fireball',
					level: 3,
					school: 'Evocation',
					castingTime: '1 Action',
					range: '150 Ft',
					components,
					duration: 'Instantaneous',
					description,
					//concentration: false,
					ritual: false
				};


				badSpell = await Spell.create(badSpellInfo).catch((e) => e);
				//console.log(badSpellLevel.errors);
				//console.log(badSpell);


			});
			test('Concentration Is Required; If None Is Provided, Throw An error', () => {
				expect(badSpell).toBeInstanceOf(mongoose.Error.ValidationError);
			});
			test('If No Concentration Is Provided, Message Should Be "Concentration Must Be Provided"', () => {
				const expected = {
					concentration: expect.objectContaining({
						properties: expect.objectContaining({ message: 'Concentration Must Be Provided', type: 'required', path: 'concentration' }
						),
						kind: 'required',
						path: 'concentration'
					})

				};
				expect(badSpell).toHaveProperty('errors', expect.objectContaining(expected));
			});
		});
		describe('Ritual Validation', () => {
			let badSpell: mongoose.Error.ValidationError;
			beforeAll(async () => {
				const components: IComponents = {
					v: true,
					s: true,
					m: 'bat guano and sulfur'
				};

				const description: IDescription = {
					main: 'A Ball of Fire Appears, Doing Fire Damage',
					atHigherLevels: 'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.'
				};
				const badSpellInfo = {
					name: 'Fireball',
					level: 3,
					school: 'Evocation',
					castingTime: '1 Action',
					range: '150 Ft',
					components,
					duration: 'Instantaneous',
					description,
					concentration: false,
					//ritual: false
				};


				badSpell = await Spell.create(badSpellInfo).catch((e) => e);
				//console.log(badSpellLevel.errors);
				//console.log(badSpell);


			});
			test('Ritual Is Required; If None Is Provided, Throw An error', () => {
				expect(badSpell).toBeInstanceOf(mongoose.Error.ValidationError);
			});
			test('If No Ritual Is Provided, Message Should Be "Ritual Must Be Provided"', () => {
				const expected = {
					ritual: expect.objectContaining({
						properties: expect.objectContaining({ message: 'Ritual Must Be Provided', type: 'required', path: 'ritual' }
						),
						kind: 'required',
						path: 'ritual'
					})

				};
				expect(badSpell).toHaveProperty('errors', expect.objectContaining(expected));
			});
		});
	});
});