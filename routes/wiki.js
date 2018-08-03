const router = require('express').Router();
const client = require('../models');
const {addPage} = require('../views');

router.get('/', async (req, res, next) => {
  res.send(`got to GET /wiki`);
});

router.post('/', async (req, res, next) => {
  res.send(`got to POST /wiki`);
});

router.get('/add', async (req, res, next) => {
  res.send(addPage()); //not showing format
});

module.exports = router;
