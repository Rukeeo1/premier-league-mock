
exports.addFixture = async (req, res, next) => {
  try {
 res.send('testing add fixtures')
  } catch (error) {
    next(error)
  }
}