const express = require('express');
const router = express.Router();
const { getBg, getBlock } = require('../queries/content');

router
  .get('/bg-img', async (req, res, next) => {
    try {
      const result = await getBg();
      res.send(result);
    } catch (err) {
      next(err)
    }
  })
  .get('/block/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await getBlock(id);
      res.send(result);
    } catch (err) {
      next(err)
    }
  })


module.exports = router;
