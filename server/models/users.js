const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var UserSchema = new mongoose.Schema({
  name:{
    type:String,
    minlength:5,
    required: true,
    trim:true
  },
  address:{
    type:String,
    minlength: 2,
    default:null
  },
  completedAt:{
    type: Number,
    default: null
  },
//<<<<------ this is to validate the email and password from users model---->>>>
  email:{
      type:String,
      required: true,
      trim: true,
      minlength:5,
      unique:true,
      validator: {
        validator: validator.isEmail,
        message: '{Value} is not a valid email'
      }
  },
  password:{
    type:String,
    required: true,
    minlength:5
  },
  tokens:[{
    access:{
      type:String,
      required: true
    },
    token:{
      type:String,
      required: true
    }
  }]
});
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['name', '_id', 'email']);
};

UserSchema.methods.generateAuthToken = function (){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, '123321').toString();

  user.tokens.push({access, token});

  return user.save().then (() => {
    return token;
  });
};
//<<<<-----Find token------>>>>>>>//////
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, '123321');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

var Users = mongoose.model('Users', UserSchema);
module.exports = {Users};
