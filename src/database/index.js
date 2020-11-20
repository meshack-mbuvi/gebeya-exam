const mongoose = require('mongoose');
// import { DB_URL } from '../config/config.json';

const dotenv = require('dotenv');
dotenv.config();

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

class MongoDB {
  constructor(uri) {
    this.MONGODB_URI = process.env.MONGODB_URI || uri;
    mongoose.connect(this.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.connection = mongoose.connection;
    this.connection.once('open', async () => {
      console.log('connected to MongoDB database :) - ' + this.MONGODB_URI);
    });
  }
}
export const database = new MongoDB();
