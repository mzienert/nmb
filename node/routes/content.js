const express = require('express');
const router = express.Router();
const { getBg } = require('../queries/content');

router
  .get('/bg-img', async (req, res) => {
    const result = await getBg();
    res.send(result);
  });

module.exports = router;
