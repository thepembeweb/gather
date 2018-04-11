const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, seedItemToDatabase, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/:itemId/update', () => {
  
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('PUT', () => {
    it('updates a existing item', async () => {
      
      // Setup
      const updatedTitle = 'Updated Title';
      const updatedDescription = 'Updated Description';
      const updatedImageUrl = 'https://www.placebear.com/200/300';

      const itemToUpdate = await seedItemToDatabase();
      const newItem = buildItemObject();
      
      // Exercise
      newItem.title = updatedTitle;
      newItem.description = updatedDescription;
      newItem.imageUrl = updatedImageUrl;
        
      const responseUpdate = await request(app)
        .post('/items/update/' + itemToUpdate._id)
        .type('form')
        .send(newItem);

      // Verify
      const updatedItem = await Item.findById(itemToUpdate._id);
            
      assert.equal(updatedItem.title, updatedTitle);
      assert.equal(updatedItem.description, updatedDescription);
      assert.equal(updatedItem.imageUrl, updatedImageUrl);
    });

  });

});
