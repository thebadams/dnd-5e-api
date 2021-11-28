import Spell from '../models/Spell';

const spellController = {
	create: async function (req: Request, res: Response) {
		const { body } = req;
		try {
			const newSpell = await Spell.create(body);
			res.send(newSpell);
		} catch (e) {
			res.send({
				message: 'There Was An Error Creating a New Spell',
				error: e
			});
		}
		
	}
};

export default spellController;