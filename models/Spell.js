const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const spellSchema = new Schema({
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
  duration: String
});

const Spell = mongoose.model('Spell', spellSchema);

module.exports = Spell;
