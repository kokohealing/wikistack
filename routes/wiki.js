const router = require('express').Router();
const { Page } = require('../models');
const { addPage, wikiPage, main } = require('../views');

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const page = new Page({
    title: title,
    content: content,
  });

  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', async (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    res.send(wikiPage(page, req.body.name));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
