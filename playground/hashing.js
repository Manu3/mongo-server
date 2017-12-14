const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data ={
  id:5
};

var token = jwt.sign(data, '1221');
console.log(`Token ${token}`);

var decoded = jwt.verify(token, '1221');
console.log('Decoded Token', decoded);
// var message = 'My name is manu';
// var hash = SHA256(message).toString();
//
// console.log(message);
// console.log(hash);
