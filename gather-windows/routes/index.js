const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

router.get('/items/create', async (req, res, next) => {
  res.render('create');
});

router.get('/items/:itemId', async (req, res, next) => {
  const item = await Item.findById(req.params.itemId);
  res.render('single', {item});
});

router.post('/items/create', async (req, res, next) => {  
  const {title, description, imageUrl} = req.body;
  const newItem = new Item({title, description, imageUrl});
  newItem.validateSync();
  if (newItem.errors) {
    res.status(400).render('create', {newItem: newItem});
  } else {
    await newItem.save();
    res.redirect('/');
  }

});

router.delete('/items/:itemId/delete', async (req, res, next) => {

  await Item.findByIdAndRemove(
    req.params.itemId, 
    (err, item) => {  
    if (err) return res.status(500).send(err);
    const response = {
        message: "Item successfully deleted",
        id: item._id
    };
    return res.status(200).send(response);
  });

});

router.get('/items/update/:itemId', async (req, res, next) => {
  const item = await Item.findById(req.params.itemId);
  res.render('update', {item});
});

router.post('/items/update/:itemId', async (req, res, next) => { 

  await Item.findByIdAndUpdate(  
    req.params.itemId,
    req.body,
    {new: true},
    (err, item) => {
        if (err) return res.status(500).send(err);
        
        console.log(item);
        res.render('update', {item});
    }
);

});

module.exports = router;
