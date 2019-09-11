const mongoose = require('mongoose');
const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  code: {
    type: String,
    required: true,
    index: true
  },
  founded: {
    type: String,
    index: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  stadiumCapactiy: {
    type: String,
  }
})

TeamSchema.methods = {
  async update(obj) {
    for (key in obj) {
      this[key] = obj[key];
    }
    await this.save();
    return this;
  }
}


const TeamModel = mongoose.model('Team', TeamSchema);

module.exports = TeamModel;