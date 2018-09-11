require('dotenv').config();
module.exports = {
  mongoURI: process.env.MONGO_DB,
  secret: process.env.SECRET
}
