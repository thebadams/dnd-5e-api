import mongoose from 'mongoose';
import { schoolsTuple } from '../../../constants/schools/schools';
import { levelTuple } from '../../../constants/levels/levels';

const Schema = mongoose.Schema;
type Levels = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Schools = 'Evocation' | 'Abjuration' | 'Necromancy' | 'Divination' | 'Illusion' | 'Transmutation' | 'Enchantment' | 'Conjuration' 
export interface ISpell {
  name: string;
  level: Levels;
  school: Schools;
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
			values: levelTuple,
			message: '{VALUE} Is Not A Valid Spell Level'
		}
	},
	school: {
		type: String,
		required: [true, 'School Must Be Provided'],
		enum: {
			values: schoolsTuple,
			message: '{VALUE} Is Not A Valid Spell School'
		}
	},
	castingTime: {
		type:String,
		required: [true, 'Casting Time Must Be Provided']
	},
	range: {
		type: String,
		required: [true, 'Range Must Be Provided']
	},
	components:{
		type: {
			v: Boolean,
			s: Boolean,
			m: String
		},
		required: [true, 'Components Must Be Provided']
	} ,
	duration: {
		type: String,
		required: [true, 'Duration Must Be Provided']
	},
	description: {
		type: {
			main: String,
			atHigherLevels: String
		}, 
		required: [true, 'Description Must Be Provided']
	},
	concentration: {
		type: Boolean,
		required: [true, 'Concentration Must Be Provided']
	},
	ritual: {
		type: Boolean,
		required: [true, 'Ritual Must Be Provided']
	}
});

const Spell = mongoose.model<ISpell>('Spell', spellSchema);

export default Spell;
