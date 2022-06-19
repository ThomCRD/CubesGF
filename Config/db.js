const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI
const mongoOpt = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

// Connect to MongoDB.
const connectDB = async () => {
  try {
      await mongoose.connect(mongoUri, mongoOpt);
      console.log('MongoDB connected!!');
  } catch (err) {
      console.log('Failed to connect to MongoDB', err);
  }
};

connectDB();
