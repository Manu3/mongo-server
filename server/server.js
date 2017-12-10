const {MongoClient,ObjectID}  = require('mongodb');
var express = require('express');
var bodyParser = require('body-Parser');

var{mongoose} = require('./db/mongoose');
var{Users} = require('./models/users');

var app = express();
var port = process.env.PORT || 9090;

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
    //GET users/id
    app.get('/users/:id',(req,res) => {
        var id = req.params.id;
        if(!ObjectID.isValid(id)){
          return res.status(404).send('Invalid Id');
        }else{
          Users.findOne({
            _id:id
          }).then((newUser) => {
            if(!newUser){
              res.status(404).send('Not found');
            }else{
              // to get complete object
              res.send({newUser});
              // to get id
            //  res.send( req.params);
            }
          });
        }
      //  res.send(req.params);
    });


  app.listen(port, () => {
    console.log(`started at port: ${port}`);
  });

  module.exports = {app};
