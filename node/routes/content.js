const express = require('express');
const router = express.Router();

router
  .get('/bg-img', (req, res) => {

    res.send('result');
  });

module.exports = router;
