const express = require('express');
const router = express.Router();
const { listAll } = require('../queries/images');

router
  .get('/list-all', async (req, res) => {
    const result = await listAll();
    res.send(result);
  })

module.exports = router;
