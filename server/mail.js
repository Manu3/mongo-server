var nodemailer = require('nodemailer');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const path = require('path');
var {mongoose} = require('./db/mongoose');
var {Users} = require('./models/users');
var {authenticate} = require('./middleware/authenticate');
var app = express();
var port = process.env.PORT || 9090;

const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'chattel6@gmail.com',
//     pass: 'chattel1234'
//   }
// });


app.get('/email', function (req, res) {
				res.render('mail',{
				title: 'Customers'
	});
});
app.post('/email', (req, res) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: req.body.name,
      pass: req.body.password
    }
  });
   //Setting up Email settings
       var mailOptions = {
           from: req.body.name,
           to : req.body.email,
           subject: 'New message from chattel',
           text : req.body.message,
       };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});


app.listen(port, () => {
    console.log(`started at port: ${port}`);
});
