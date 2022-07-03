const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    required: false,
  },
  admin: {
    type: Boolean,
    required: false,
  },
});

const User = (module.exports = mongoose.model("User", userSchema));

module.exports.getUserById = function (id, callback) {
  User.findById({ _id: id }, callback);
};

module.exports.authenticateUser = function (email, callback) {
  User.updateOne({ email: email }, { $set: { authenticated: true } }, callback);
};

module.exports.getUserByEmail = function (email, callback) {
  const query = { email: email };
  User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  if (!candidatePassword) {
    return false;
  }
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

module.exports.updatePassword = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(newUser.newPassword, salt, (err, hash) => {
      if (err) throw err;
      newUser.newPassword = hash;
      User.updateOne(
        { email: newUser.email },
        { $set: { password: newUser.newPassword } },
        callback
      );
    });
  });
};
