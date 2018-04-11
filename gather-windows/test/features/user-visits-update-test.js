const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits the update page', () => {
    describe('updates an item', () => {
      it('and is rendered', () => {
        const itemToUpdate = buildItemObject();
        browser.url('/items/update');
        browser.setValue('#title-input', itemToUpdate.title);
        browser.setValue('#description-input', itemToUpdate.description);
        browser.setValue('#imageUrl-input', itemToUpdate.imageUrl);
        browser.click('#submit-button');
        assert.include(browser.getText('body'), itemToUpdate.title);
        assert.include(browser.getAttribute('body img', 'src'), itemToUpdate.imageUrl);
      });
    });
});

