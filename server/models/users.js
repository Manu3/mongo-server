const mongoose = require('mongoose');
var Users = mongoose.model('Users',{
  name:{
    type:String,
    minlength:5,
    required: true,
    trim:true
  },
  address:{
    type:String,
    minlength: 2
  },
  completedAt:{
    type: Number,
    default: null
  }
})
module.exports = {Users};
