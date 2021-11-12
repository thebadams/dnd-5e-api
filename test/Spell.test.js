const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const Spell = require('../models/Spell');

describe('Spell Schema', () => {
  let mongod
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }).then(() => console.log('Connected To Database'))
  })

  afterAll(async () => {
    await mongoose.disconnect().then(() => console.log('Database Disconnected'))
    await mongod.stop().then(() => console.log('Database Torn Down'))
  })
  describe('Spell Schema Properties', () => {
    let newSpell
    beforeAll(async () => {
      newSpell = await Spell.create({})
    })
    it('Should Have An _id Property', async () => {
      expect(newSpell).toHaveProperty('_id')
    })
  })
})