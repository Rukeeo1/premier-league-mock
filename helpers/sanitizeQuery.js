/**
 *
 * @param {String}
 * @returns escaped string
 */
module.exports = string => {
  const cleanStr =   string.replace(/[[\]{}()*+?.,\\^$|#<>=]/g, '');
  return cleanStr.split(' ')
 };
 