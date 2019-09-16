const uuidv4 = require('uuid/v4');

const generateLink = () => {
  return `fixtures/unique/` + uuidv4()
}
module.exports = generateLink