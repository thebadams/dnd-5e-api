import Spell from '../models/Spell';
import {Response, Request} from 'express';
const spellController = {
	create: async function (req: Request, res: Response) {
		const { body } = req;
		const newSpell = await Spell.create(body);
		res.status(200).json(newSpell);
	}
};

export default spellController;