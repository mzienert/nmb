'use strict'
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));

app.options('*', cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Options");
  next();
});

const images = require('./routes/images');
app.use('/images', images);

const events = require('./routes/events');
app.use('/events', events);

const content = require('./routes/content');
app.use('/content', content);

/*app.get('/get-menu', (req, res) => {
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

*/

module.exports = app
