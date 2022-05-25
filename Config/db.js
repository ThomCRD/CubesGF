<<<<<<< HEAD
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
require('dotenv').config();

const mongoString = process.env.MONGO_URI

mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true});
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

=======
const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI
const mongoOpt = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const connectDB = async () => {
  try {
      await mongoose.connect(mongoUri, mongoOpt);
      console.log('MongoDB connected!!');
  } catch (err) {
      console.log('Failed to connect to MongoDB', err);
  }
};

connectDB();
>>>>>>> 3-api-connection-for-User-collection
