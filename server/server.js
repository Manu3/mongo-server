var express = require('express');
var bodyParser = require('body-Parser');

var{mongoose} = require('./db/mongoose');
var{Users} = require('./models/users');

var app = express();

app.use(bodyParser.json());

app.post('/wow', (req,res) =>{
  var newUser = new Users({
    text: req.body.text
  });

  newUser.save().then((doc) => {
  res.send(doc);
  }, (e) =>{
    res.status(400).send(e);
  });

  });
  app.listen(9090, () => {
    console.log('server is up on 9090');
  });
