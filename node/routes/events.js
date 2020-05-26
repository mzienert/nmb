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
  .post('/create', async (req, res) => {



    const result = await createEvent();
    res.send(result);
  });


module.exports = router;

/*
app.post('/create-event', (req, res) => {
  connection.query(`INSERT INTO nmb.events (title, description, startTime, endTime, type, allDay) VALUES ('${req.body.name}', '${req.body.description}', '${req.body.date}', '${req.body.endTime}', '${req.body.type}', '${req.body.allDay}')`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
});



app.post('/update-event/:id', (req, res) => {
  let id = req.params.id;
  connection.query(`UPDATE nmb.events SET title = '${req.body.name}', description = '${req.body.description}' WHERE id = ${id}`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
});
*/
