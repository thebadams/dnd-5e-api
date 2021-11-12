const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const spellSchema = new Schema({
  name: String,
  level: Number
});

const Spell = mongoose.model('Spell', spellSchema);

module.exports = Spell;
