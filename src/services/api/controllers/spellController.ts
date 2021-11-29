import Spell from '../models/Spell';
import {Response, Request} from 'express';
const spellController = {
	create: async function (req: Request, res: Response) {
		const { body } = req;
		try{
			const newSpell = await Spell.create(body);
			res.status(200).json(newSpell);
		} catch (e) {
			res.status(400).json({
				message: 'Failed To Create A Spell',
				error: e
			});
		}
		
	}
};

export default spellController;