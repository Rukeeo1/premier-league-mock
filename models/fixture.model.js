const mongoose = require('mongoose');

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
    ref: "Team",
    required: true,
    index: true
  },
  awayTeam: {
    type: mongoose.Types.ObjectId,
    ref: "Team",
    required: true,
    index: true
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
    get: (v) => {
      return this.status === 'Pending' ? ' - ' : `${this.goalsAwayTeam} - ${this.goalsHomeTeam}`;
    }
  }
})

const FixtureModel = mongoose.model('Fixture', FixtureSchema);


module.exports = FixtureModel 