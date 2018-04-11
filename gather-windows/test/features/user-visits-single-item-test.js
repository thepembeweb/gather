const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits the single item page', () => {
    describe('posts a new item', () => {
      it('and is rendered', () => {
        const itemToCreate = buildItemObject();
        browser.url('/items/create');
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        browser.click('#submit-button');

        browser.click('.item-card a');
        assert.include(browser.getText('body'), itemToCreate.description);
      });
    });
});

