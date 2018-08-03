const router = require('express').Router();
const { Page } = require('../models');
const { addPage } = require('../views');

router.get('/', async (req, res, next) => {
  res.send(`got to GET /wiki`);
});

router.post('/', async (req, res, next) => {
  // res.json(req.body);
  
  const title = req.body.title;
  const content = req.body.content;

  const page = new Page({
    title: title,
    content: content,
  });

  try {
    await page.save();
    console.log(page.dataValues);
    res.redirect('/');
  } catch (error){
    next(error)
  }
  

});

router.get('/add', async (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
