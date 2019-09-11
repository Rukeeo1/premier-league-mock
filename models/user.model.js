const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const EncodeToken = require('../helpers/EncodeToken');
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

UserSchema.methods = {
  /**
   * checks if inputed password is similar to the one on the user object.
   * @param {string} password - input
   */
  async checkPasswordMatch(password) {
    return await bcrypt.compare(password, this.password)
  },

  token() {
    return EncodeToken(this.email, this._id, this.isAdmin, this.favoriteTeam, this.location)

  },

  transform() {
    const userInfoAferLogin = {
      email: this.email,
      favoriteTeam: this.favoriteTeam,
      location: this.location,
      name: this.name
    }
    return (userInfoAferLogin)
  }

}
const UserModel = mongoose.model('User', UserSchema);


module.exports = UserModel
