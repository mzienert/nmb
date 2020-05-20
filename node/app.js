'use strict'
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const IncomingForm = require('formidable').IncomingForm;

app.use(bodyParser.json({limit: '50mb'}));
app.options('*', cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Options");
  next();
});

const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-west-2',
  accessKeyId: 'AKIAIVL4OZ44KEJYSP4A',
  secretAccessKey: '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'
});
var s3Bucket = new AWS.S3( { params: {Bucket: 'nmb-20181206083858--hostingbucket'} } );

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'nmb.c9osive9tpqw.us-west-2.rds.amazonaws.com',
  user     : 'root',
  password : 'Freeski_2019',
  port     : 3306,
  multipleStatements: true
});

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

app.get('/get-menu', (req, res) => {
  connection.query(`SELECT * FROM nmb.menu ORDER BY pos ASC`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
});

app.get('/get-drink/:id', (req, res) => {
  let id = req.params.id;
  connection.query(`SELECT * FROM nmb.menu WHERE id = ${id}`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
});

app.post('/create-drink', (req, res) => {
  connection.query(`INSERT INTO nmb.menu (name, description, price) VALUES ('${req.body.name}', '${req.body.description}', '${req.body.price}')`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
});

app.post('/update-drink/:id', (req, res) => {
  let id = req.params.id;
  connection.query(`UPDATE nmb.menu SET name = '${req.body.name}', description = '${req.body.description}', price = '${req.body.price}' WHERE id = ${id}`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
});

app.post('/set-hours', (req, res) => {
  const hours = req.body;
  connection.query(`UPDATE nmb.hours SET open = '${req.body.monOpen}', close = '${req.body.monClose}' WHERE id = 1; UPDATE nmb.hours SET open = '${req.body.tueOpen}', close = '${req.body.tueClose}' WHERE id = 2; UPDATE nmb.hours SET open = '${req.body.wedOpen}', close = '${req.body.wedClose}' WHERE id = 3; UPDATE nmb.hours SET open = '${req.body.thuOpen}', close = '${req.body.thuClose}' WHERE id = 4; UPDATE nmb.hours SET open = '${req.body.friOpen}', close = '${req.body.friClose}' WHERE id = 5; UPDATE nmb.hours SET open = '${req.body.satOpen}', close = '${req.body.satClose}' WHERE id = 6; UPDATE nmb.hours SET open = '${req.body.sunOpen}', close = '${req.body.sunClose}' WHERE id = 7;`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})

app.get('/get-hours', (req, res) => {
  connection.query(`SELECT * FROM nmb.hours`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})

app.get('/get-message', (req, res) => {
  connection.query(`SELECT * FROM nmb.messages WHERE id = 1`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})

app.post('/update-message', (req, res) => {
  console.log(req.body)
  let msg;
  if(req.body.text === null) {
    msg = '';
  } else {
    msg = req.body.text;
  }
  connection.query(`UPDATE nmb.messages SET message = '${msg}' WHERE id = 1`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})

app.post('/insert-image', (req, res) => {
  connection.query(`INSERT INTO nmb.images(name, type) VALUE ('${req.body.name}', ${req.body.type})`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})

app.get('/list-images', (req, res) => {
  connection.query(`SELECT * FROM nmb.images WHERE type = 0 ORDER BY id DESC`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})

app.get('/list-media', (req, res) => {
  connection.query(`SELECT * FROM nmb.images WHERE type = 1 ORDER BY id DESC`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})


app.post('/delete-image', (req, res) => {
  connection.query(`DELETE FROM nmb.images WHERE name = ('${req.body.name}')`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})

app.get('/image-one', (req, res) => {
  connection.query(`SELECT name FROM nmb.images WHERE one = 1`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})

app.get('/image-two', (req, res) => {
  connection.query(`SELECT name FROM nmb.images WHERE two = 1`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})

app.get('/image-bg', (req, res) => {
  connection.query(`SELECT name FROM nmb.images WHERE bg = 1`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})

app.post('/update-image-one', (req, res) => {
  connection.query(`UPDATE nmb.images SET one = 0`, function (err, result) {
    if(err) throw err;
  });
  connection.query(`UPDATE nmb.images SET one = 1 WHERE name = '${req.body.name}'`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})

app.post('/update-image-two', (req, res) => {
  connection.query(`UPDATE nmb.images SET two = 0`, function (err, result) {
    if(err) throw err;
  });
  connection.query(`UPDATE nmb.images SET two = 1 WHERE name = '${req.body.name}'`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})

app.post('/update-image-bg', (req, res) => {
  connection.query(`UPDATE nmb.images SET bg = 0`, function (err, result) {
    if(err) throw err;
  });
  connection.query(`UPDATE nmb.images SET bg = 1 WHERE name = '${req.body.name}'`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})

app.get('/about-one', (req, res) => {
  connection.query(`SELECT * FROM nmb.about WHERE id = 1`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})

app.get('/about-two', (req, res) => {
  connection.query(`SELECT * FROM nmb.about WHERE id = 2`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})

app.post('/update-about', (req, res) => {
  connection.query(`UPDATE nmb.about SET content = '${req.body.one}' WHERE id = 1`, function (err, result) {
    if(err) throw err;
  });
  connection.query(`UPDATE nmb.about SET content = '${req.body.two}' WHERE id = 2`, function (err, result) {
    if(err) throw err;
    res.send(result);
  });
})

module.exports = app