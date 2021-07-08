const express = require('express');
const router = express.Router();
const { getBg, getBlock, updateContent, getMessage, updateMessage } = require('../queries/content');

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
  .post('/update-content', async (req, res, next) => {
    const aboutData = req.body;
    try {
      const result = await updateContent(aboutData);
      res.send(result);
    } catch (err) {
      next(err)
    }
  })
  .get('/message', async (req, res, next) => {
    try {
      const result = await getMessage();
      res.send(result);
    } catch (err) {
      next(err)
    }
  })
  .post('/update-message', async (req, res, next) => {
    const messageData = req.body;
    try {
      const result = await updateMessage(messageData);
      res.send(result);
    } catch (err) {
      next(err)
    }
  });

module.exports = router;
