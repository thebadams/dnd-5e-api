import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface spellInterface {
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

const spellSchema = new Schema<spellInterface>({
  name: String,
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

const Spell = mongoose.model<spellInterface>('Spell', spellSchema);

export default Spell
