const TeamModel = require('../models/team.model');




const teams = [
  {
    name: 'Arsenal',
    code: 'AFC',
    founded: '1900',
    address: 'Emirates Stadium',
    city: 'London (Holloway)',
    stadiumCapacity: '60,260'
  },
  {
    name: 'Bournemouth',
    code: 'BFC',
    founded: '1900',
    address: 'Dean Court',
    city: 'Bournemouth',
    stadiumCapacity: '11,329'
  },
  {
    name: 'Brighton & Hove Albion',
    code: 'BFC',
    founded: '1900',
    address: 'Falmer Stadium',
    city: 'Brighton',
    stadiumCapacity: '30,666'
  },
  {
    name: 'Burnley',
    code: 'BUR',
    founded: '1900',
    address: 'Turf Moor',
    city: 'Burnley',
    stadiumCapacity: '21,944'
  },
  {
    name: 'Cardiff City',
    code: 'CAR',
    founded: '1900',
    address: 'Cardiff City Stadium',
    city: 'Cardiff',
    stadiumCapacity: '33,316'
  },
  {
    name: 'Chelsea',
    code: 'CAR',
    founded: '1900',
    address: 'Stamford Bridge',
    city: 'London',
    stadiumCapacity: '40,853'
  },
  {
    name: 'Crystal Palace',
    code: 'CRP',
    founded: '1900',
    address: 'Selhurst Park',
    city: 'London (Selhurst)',
    stadiumCapacity: '26,074'
  },
  {
    name: 'Everton',
    code: 'EVR',
    founded: '1900',
    address: 'Goodison Park',
    city: 'Liverpool (Walton)',
    stadiumCapacity: '39,221'
  },
  {
    name: 'Fulham',
    code: 'CRP',
    founded: '1900',
    address: 'Craven Cottage',
    city: 'London (Fulham)',
    stadiumCapacity: '25,700'
  },
  {
    name: 'Huddersfield Town',
    code: 'CRP',
    founded: '1900',
    address: 'Craven Cottage',
    city: 'Huddersfield',
    stadiumCapacity: '25,700'
  },
  {
    name: 'Huddersfield Town',
    code: 'HFT',
    founded: '1900',
    address: 'Kirklees Stadium',
    city: 'Huddersfield',
    stadiumCapacity: '24,500'
  },
  {
    name: 'Leicester City',
    code: 'Leicester',
    founded: '1900',
    address: 'King Power Stadium',
    city: 'Leicester',
    stadiumCapacity: '32,273'
  },
  {
    name: 'Liverpool',
    code: 'LIV',
    founded: '1900',
    address: 'Anfield',
    city: 'Liverpool (Anfield)',
    stadiumCapacity: '54,074'
  },
  {
    name: 'Manchester City',
    code: 'MCFC',
    founded: '1900',
    address: 'City of Manchester Stadium',
    city: 'Manchester',
    stadiumCapacity: '55,017'
  },
  {
    name: 'Manchester United',
    code: 'MUN',
    founded: '1900',
    address: 'Old Trafford',
    city: 'Old Trafford',
    stadiumCapacity: '74,879'
  },
  {
    name: 'Newcastle United',
    code: 'MUN',
    founded: '1900',
    address: "St James' Park",
    city: 'Newcastle upon Tyne',
    stadiumCapacity: '52,354'
  },
  {
    name: 'Southampton',
    code: 'SMP',
    founded: '1900',
    address: "St Mary's Stadium",
    city: 'Southampton',
    stadiumCapacity: '32,384'
  },
  {
    name: 'Tottenham Hotspur',
    code: 'SPURS',
    founded: '1900',
    address: 'Wembley Stadium',
    city: 'London (Wembley)',
    stadiumCapacity: '90,000[b]'
  },
  {
    name: 'Tottenham Hotspur',
    code: 'SPURS',
    founded: '1900',
    address: 'Wembley Stadium',
    city: 'London (Wembley)',
    stadiumCapacity: '90,000[b]'
  },
  {
    name: 'Watford',
    code: 'SPURS',
    founded: '1900',
    address: 'Vicarage Road',
    city: 'Watford',
    stadiumCapacity: '20,400'
  },
  {
    name: 'West Ham United',
    code: 'WHU',
    founded: '1900',
    address: 'London Stadium',
    city: 'London (Stratford)',
    stadiumCapacity: '60,000'
  },
  {
    name: 'Wolverhampton Wanderers',
    code: 'WHU',
    founded: '1900',
    address: 'Molineux Stadium',
    city: 'Wolverhampton',
    stadiumCapacity: '32,050'
  }
];

module.exports = teams