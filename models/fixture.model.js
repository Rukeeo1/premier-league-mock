const mongoose = require('mongoose');
const sanitizeQuery = require('../helpers/sanitizeQuery');

const FixtureSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    index: true
  },
  time: {
    type: String,
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
    index: true
  },
  refree: {
    type: String
  },
  venue: {
    type: String,
    index: true
  },
  homeTeam: {
    type: mongoose.Types.ObjectId,
    ref: 'Team',
    required: true,
    index: true
  },
  awayTeam: {
    type: mongoose.Types.ObjectId,
    ref: 'Team',
    required: true,
    index: true
  },
  awayTeamName: {
    type: String,
    index: true
  },
  goalsHomeTeam: {
    type: String,
    default: '0'
  },
  goalsHomeTeam: {
    type: String,
    default: '0'
  },
  goalsAwayTeam: {
    type: String,
    default: '0'
  },
  fullTimeScores: {
    type: String
  },
  result: {
    type: String,
    get: v => {
      return this.status === 'Pending'
        ? ' - '
        : `${this.goalsAwayTeam} - ${this.goalsHomeTeam}`;
    }
  }
});

FixtureSchema.methods = {
  async update(obj) {
    for (key in obj) {
      this[key] = obj[key];
    }
    await this.save();
    return this;
  }
}

FixtureSchema.statics = {
 
  async search(searchTerm) {
    try {
      let listOfQueries = sanitizeQuery(searchTerm);

      let search = [];
      let fixtures = [];
      for (let i = 0, length = listOfQueries.length; i < length; i++) {
        if (!listOfQueries[i]) continue;
        const regexValue = new RegExp(listOfQueries[i], 'gi');
        let query = [
          { homeTeamName: { $regex: regexValue } },
          { awayTeamName: { $regex: regexValue } },
          { status: { $regex: regexValue } },
          { venue: { $regex: regexValue } }
        ];
        search = search.concat(query);
      }

      if (search.length) {
        fixtures = await this.find({
          $or: search
        });
      }
      return fixtures;
    } catch (error) {
      next(error);
    }
  },
  async get(id) {
    try {
      return await this.findById(id)
        .populate({
          path: "homeTeam",
          select: "name address city"
        }).populate({
          path: "awayTeam",
          select: "name address city"
        }).exec()
    } catch (error) {
      next(error)
    }

  }
};

const FixtureModel = mongoose.model('Fixture', FixtureSchema);

module.exports = FixtureModel;
