const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const spellSchema = new Schema({
  name: String
});

const Spell = mongoose.model('Spell', spellSchema);

module.exports = Spell;
