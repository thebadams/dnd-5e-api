import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface ISpell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: {
    v: boolean;
    s: boolean;
    m: string;
  };
  duration: string;
  description: {
    main: string;
    atHigherLevels: string;
  };
}

export interface IComponents {
	v: boolean;
	s: boolean;
	m: string;
}

const spellSchema = new Schema<ISpell>({
	name: {
		type: String,
		required: [true, 'Name Must Be Provided']
	},
	level: Number,
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
	}
});

const Spell = mongoose.model<ISpell>('Spell', spellSchema);

export default Spell;
