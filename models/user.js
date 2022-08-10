const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const NotDataError = require('../utils/errorcodes/not-pass-or-email');

const {
  userNameValidator,
  userEmailValidator,
  userPasswordValidator,
} = require('../validators/validators');
const { ERRORS } = require('../utils/config');

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    unique: true,
    required: true,
    validate: userEmailValidator,
  },

  password: {
    type: String,
    required: true,
    select: false,
    validate: userPasswordValidator,
  },

  name: {
    type: String,
    required: true,
    validate: userNameValidator,
  },

});
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotDataError(ERRORS.USER.INCORRECT_AUTH);
      }
      return Promise.all([
        user,
        bcrypt.compare(password, user.password),
      ]);
    });
};

module.exports = mongoose.model('user', userSchema);
