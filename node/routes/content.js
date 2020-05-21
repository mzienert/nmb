const express = require('express');
const router = express.Router();
const { getBg } = require('../queries/content');

router
  .get('/bg-img', async (req, res, next) => {
    try {
      const result = await getBg();
      res.send(result);
    } catch (err) {
      next(err)
    }
  });

module.exports = router;
