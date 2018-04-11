
const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('DELETE', () => {
    it('creates new item and deletes the item', async () => {
      // Setup
      const deletedItemResult = null;
      
      const item = await seedItemToDatabase();
   
      // Exercise
      const response = await request(app)
        .delete('/items/' + item._id + '/delete');

      // Verify
      const deletedItem = await Item.findById(item._id);

      assert.equal(deletedItem, deletedItemResult);  
    });

  });

});
