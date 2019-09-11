const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
/**
 * user schema
 */

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  favoriteTeam: {
    type: String
  },
  location: {
    type: String
  }
});


UserSchema.pre('save', function (next) {
  /**
   * This method, encrypts the user's password before save...
   */
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
})

const UserModel = mongoose.model('User', UserSchema);


module.exports = UserModel
