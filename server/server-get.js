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
var {authenticate} = require('./middleware/authenticate');
var app = express();
var port = process.env.PORT || 9090;

app.use(bodyParser.json());



app.get('/users', (req, res) => {
    Users.find().then((users) => {
        res.send({
            users
        });
    }, (err) => {
        res.status(400).send(err);
    });
});
//GET users/id
// app.get('/users/:id', (req, res) => {
//     var id = req.params.id;
//     if (!ObjectID.isValid(id)) {
//         return res.status(404).send('Invalid Id');
//     } else {
//         Users.findOne({
//             _id: id
//         }).then((newUser) => {
//             if (!newUser) {
//                 res.status(404).send('Not found');
//             } else {
//                 // to get complete object
//                 res.send({
//                     newUser
//                 });
//                 // to get id
//                 //  res.send( req.params);
//             }
//         });
//     }
// });

// GET Private route <<<<--Authentication-->>>> users/me


app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});


app.listen(port, () => {
    console.log(`started at port: ${port}`);
});

module.exports = {
    app
};
