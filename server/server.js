var express = require('express');
var bodyParser = require('body-Parser');

var{mongoose} = require('./db/mongoose');
var{Users} = require('./models/users');

var app = express();

app.use(bodyParser.json());

app.post('/users', (req,res) =>{
  var newUser = new Users({
    name: req.body.name
  });
  newUser.save().then((doc) => {
  res.send(doc);
  }, (e) =>{
    res.status(400).send(e);
    });
  });

  app.get('/users', (req,res) =>{
    Users.find().then((users) => {
        res.send({users});
    }, (err) =>{
        res.status(400).send(err);
      });
    });
  app.listen(9090, () => {
    console.log('server is up on 9090');
  });

  module.exports = {app};
