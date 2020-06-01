const express = require('express');
const router = express.Router();
const { listAll, getEvent, createEvent } = require('../queries/events');

router
  .get('/list-all', async (req, res) => {
    const result = await listAll();
    res.send(result);
  })
  .get('/:id/:date', async (req, res) => {
    const eventId = parseInt(req.params.id);
    const eventDate = parseInt(req.params.date);

    const result = await getEvent(eventId, eventDate);
    res.send(result);
  })
  .post('/create/:title/:date/:body', async (req, res) => {
    const eventData = {
      title: req.body.title,
      date: req.body.date,
      body: req.body.body,
    }

    const result = await createEvent(eventData);
    res.send(result);
  });


module.exports = router;

/*


app.post('/update-event/:id', (req, res) => {
  let id = req.params.id;
  connection.query(`UPDATE nmb.events SET title = '${req.body.name}', description = '${req.body.description}' WHERE id = ${id}`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
});
*/
