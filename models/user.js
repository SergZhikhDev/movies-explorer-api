const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const NotDataError = require('../utils/errorcodes/not-pass-or-email');

const {
  userNameValidator,
  userEmailValidator,
  userPasswordValidator,
} = require('../validators/validators');

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
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotDataError();
      }
      return Promise.all([
        user,
        bcrypt.compare(password, user.password),
      ]);
    });
};

module.exports = mongoose.model('user', userSchema);
