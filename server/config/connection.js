require('dotenv').config(); 

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://bookmanager:xV7JhRxfHv4cQ9qI@cluster0.enm90kq.mongodb.net/?retryWrites=true&w=majority", {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
