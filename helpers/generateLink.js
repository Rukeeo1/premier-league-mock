const uuidv4 = require('uuid/v4');

const generateLink = () => {
  return `fixtures/unique/` + uuidv4()
}

console.log(generateLink(),'this')

module.exports = generateLink