const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/UsersData');
//console.log('connect me');
module.exports = {mongoose};
