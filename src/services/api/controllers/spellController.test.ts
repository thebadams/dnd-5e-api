import spellController from './spellController';
import {MongoMemoryServer} from 'mongodb-memory-server';
import {ISpell} from '../models/Spell';
import {SchoolsEnum} from '../../../constants/schools/schools';
import { LevelEnum} from '../../../constants/levels/levels';
import mongoose from 'mongoose';
import {Response, Request, response, request } from 'express';



describe('Spell Controller', () => {
	let mongod: MongoMemoryServer;
	beforeAll(async () => {
		mongod = await MongoMemoryServer.create();
		const uri = mongod.getUri();
		await mongoose.connect(uri).then(() => console.log('Connected To Database'));
	});

	afterAll(async () =>{
		await mongoose.disconnect().then(() => console.log('Database Disconnected'));
		await mongod.stop().then(() => console.log('Database Torn down'));
	});
	describe('Create Function', () => {
		test('Spell Controller Should Have A Property, Create That Is a Function', () => {
			expect(spellController).toHaveProperty('create');
			expect(typeof spellController.create).toBe('function');
		});

		test('When Called, Properly, the Created Spell Should Be Returned', async () => {
			const body: ISpell = {
				name: 'Fireball',
				level: LevelEnum.THREE,
				school: SchoolsEnum.EVOCATION,
				castingTime: '1 Action',
				range: '60 feet',
				components: {
					v: true,
					s: true,
					m: 'bat guano and sulfur'
				},
				duration: 'instantaneous',
				description: {
					main: 'Massive Fire Damage',
					atHigherLevels: 'Even More Damage'
				},
				concentration: false,
				ritual: false
			};
			const mockRequest = {
				body
			} as Request;

			interface MockResponse {
				send: () => any;
				status: () => any;

			}
			const sendSpy = jest.spyOn(response, 'send');
			// const mockResponse: Partial<Response> = {
			// 	send: jest.fn().mockReturnThis(),
			// 	status: jest.fn().mockReturnThis()
			// };
			const mockResponse = () => {
				const response: Partial<Response> = {};
				response.json = jest.fn().mockReturnValue(response);
				response.status = jest.fn().mockReturnValue(response);
				return response;
			};
			const res = mockResponse();
			await spellController.create(mockRequest, res as Response);
			expect(res.status).toHaveBeenCalledWith(200);
			const expected = {
				name: 'Fireball',
				level: LevelEnum.THREE,
				school: SchoolsEnum.EVOCATION,
				castingTime: '1 Action',
				range: '60 feet',
				components: expect.objectContaining(body.components),
				duration: 'instantaneous',
				description: expect.objectContaining(body.description),
				concentration: false,
				ritual: false

			};
			expect(res.json).toHaveBeenCalledWith(expect.objectContaining(expected));
			// expect(mockResponse.status).toHaveBeenCalledWith(200);
		});
	});
});