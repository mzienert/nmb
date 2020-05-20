const express = require('express');
const router = express.Router();
const docClient = require('../config/db');

router
  .get('/list-all', (req, res) => {
    const params = {
      TableName: "Events",
      ProjectionExpression: "title",
      FilterExpression: "#dt < :cur_dt",
      ExpressionAttributeNames: {
        "#dt": "date",
      },
      ExpressionAttributeValues: {
        ":cur_dt": Date.now(),
      }
    };

    const onScan = (err, data) => {
      if (err) console.log(JSON.stringify(err, null, 2));
      res.send(JSON.stringify(data, null, 2))
    }
    docClient.scan(params, onScan);
  })
  .get('/:id/:date', (req, res) => {
    const table = 'Events';
    const eventId = parseInt(req.params.id);
    const eventDate = parseInt(req.params.date);
    const params = {
      TableName: table,
      Key:{
        "id": eventId,
        "date": eventDate,
      }
    };

    docClient.get(params, function(err, data) {
      if (err) console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      res.send(JSON.stringify(data, null, 2));
    });
  })
  //.post('create', ())

module.exports = router;

/*
app.post('/create-event', (req, res) => {
  connection.query(`INSERT INTO nmb.events (title, description, startTime, endTime, type, allDay) VALUES ('${req.body.name}', '${req.body.description}', '${req.body.date}', '${req.body.endTime}', '${req.body.type}', '${req.body.allDay}')`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
});

app.get('/get-events', (req, res) => {
  connection.query(`SELECT * FROM nmb.events WHERE startTime >= CURDATE() ORDER BY type DESC, startTime ASC`, function (err, result) {
    if(err) throw err;
    console.log(result)
    res.send(result);
  });
});

app.get('/get-event/:id', (req, res) => {
  let id = req.params.id;
  connection.query(`SELECT * FROM nmb.events WHERE id = ${id}`, function (err, result) {
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
