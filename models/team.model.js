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

TeamSchema.statics = {
  async search(searchTerm){

    try {
      let listOfQueries = sanitizeQuery(searchTerm)

      let search = []
      let teams = []

      for (let i = 0, length = listOfQueries.length; i < length; i++) {
        if (!listOfQueries[i]) continue;
        const regexValue = new RegExp(listOfQueries[i], 'gi');
        let query = [
          { name: { $regex: regexValue } },
          { code: { $regex: regexValue } },
          { founded: { $regex: regexValue } },
          { city : {$regex: regexValue}}
        ];
        search = search.concat(query);
      
      }
      
    
      if (search.length) {
        teams = await this.find({
          $or: search
        });
      }
 
      return teams;
    } catch (error) {
      next(error)
    }

  }
}

const TeamModel = mongoose.model('Team', TeamSchema);

module.exports = TeamModel;