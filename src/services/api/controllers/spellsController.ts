import { Request, Response } from 'express';
import Spell, { ISpell } from '../models/Spell';

const SpellController = {
	create: async function (req: Request, res: Response) {
		

		try {
			if (!req.body) {
				throw new Error('No Body Passed In With Request');
			}
			const newSpell = await Spell.create(req.body);
			res.status(200).send(newSpell);
		} catch (error) {
			res.status(422).send(error);
		}
	},

	find: async function (req: Request, res: Response) {
		try {
			const spells: ISpell[] | ISpell = await Spell.find();
			if(spells.length === 0) {
				res.status(204).send({message: 'No Spells Found'});
			}
			res.status(200).send(spells);
		} catch (error) {
			res.status(400).send(error);
		}
	}
};

export default SpellController;