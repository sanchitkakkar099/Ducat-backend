const mongoose = require("mongoose");

module.exports = async () => {
  mongoose.connect(process.env.DB_URL)
    .then(() => console.log('DB Connected!'));
  mongoose.set('debug', true)
}