const express = require('express');
const router = express.Router();
const { getBg, getBlockOne, getBlockTwo } = require('../queries/content');

router
  .get('/bg-img', async (req, res, next) => {
    try {
      const result = await getBg();
      res.send(result);
    } catch (err) {
      next(err)
    }
  })
  .get('/block-one', async (req, res, next) => {
    try {
      const result = await getBlockOne();
      res.send(result);
    } catch (err) {
      next(err)
    }
  })
  .get('/block-two', async (req, res, next) => {
    try {
      const result = await getBlockTwo();
      res.send(result);
    } catch (err) {
      next(err)
    }
  });

module.exports = router;
