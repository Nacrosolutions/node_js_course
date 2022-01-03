const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');



//Create a Schema 5 field name,email,photo,password,passwordConfirm 

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Please tell us your name']
  },
  email: {
    type: String,
    required: [true, 'Pleae provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Pleae provide a valid email']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please enter a vaild password'],
    minlength: 8

  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //This works only on save/create;
      validator: function (el) {
        return el === this.password
      },
      message: 'Passwords are not the same'
    }
  }

});

userSchema.pre('save', async function (next) {

  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined;
  next()
});

const User = mongoose.model('User', userSchema);
module.exports = User