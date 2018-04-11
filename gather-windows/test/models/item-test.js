const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  describe('#title', () => {
    it('is a String', () => {
      const titleAsNonString = 1;
      const item = new Item({title: titleAsNonString});
      assert.strictEqual(item.title, titleAsNonString.toString());
    });
    it('is required', () => {
      const item = new Item({});
      item.validateSync();
      assert.equal(item.errors.title.message, 'Path `title` is required.');      
    });
  });

  describe('#description', () => {
    it('is a String', () => {
      const descriptionAsNonString = 1;
      const item = new Item({description: descriptionAsNonString});
      assert.strictEqual(item.description, descriptionAsNonString.toString());
    });
    it('is required', () => {
      const item = new Item({});
      item.validateSync();
      assert.equal(item.errors.description.message, 'Path `description` is required.');      
    });
  });

  describe('#imageUrl', () => {
    it('is a String', () => {
      const imageUrlAsNonString = 1;
      const item = new Item({imageUrl: imageUrlAsNonString});
      assert.strictEqual(item.imageUrl, imageUrlAsNonString.toString());
    });
    it('is required', () => {
      const item = new Item({});
      item.validateSync();
      assert.equal(item.errors.imageUrl.message, 'Path `imageUrl` is required.');      
    });
  });

});
