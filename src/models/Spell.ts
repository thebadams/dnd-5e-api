import mongoose from 'mongoose';
import { schoolsTuple } from '../constants/schools';

const Schema = mongoose.Schema;

export interface ISpell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: IComponents;
  duration: string;
  description: IDescription;
	concentration: boolean;
	ritual: boolean;
}

export interface IComponents {
	v: boolean;
	s: boolean;
	m: string;
}

export interface IDescription {
	main: string;
	atHigherLevels?: string;
}

const spellSchema = new Schema<ISpell>({
	name: {
		type: String,
		required: [true, 'Name Must Be Provided']
	},
	level:{
		type: Number,
		required: [true, 'Level Must Be Provided'],
		enum: {
			values:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			message: '{VALUE} Is Not A Valid Spell Level'
		}
	},
	school: String,
	castingTime: String,
	range: String,
	components: {
		v: Boolean,
		s: Boolean,
		m: String
	},
	duration: String,
	description: {
		main: String,
		atHigherLevels: String
	},
	concentration: Boolean,
	ritual: Boolean
});

const Spell = mongoose.model<ISpell>('Spell', spellSchema);

export default Spell;
