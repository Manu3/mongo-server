const {
    MongoClient,
    ObjectID
} = require('mongodb');
var express = require('express');
var bodyParser = require('body-Parser');
var {
    mongoose
} = require('./db/mongoose');
var {
    Users
} = require('./models/users');

var app = express();
var port = process.env.PORT || 9090;

app.use(bodyParser.json());

app.post('/users', (req, res) => {
    var newUser = new Users({
        name: req.body.name
    });
    newUser.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`started at port: ${port}`);
});

module.exports = {
    app
};
