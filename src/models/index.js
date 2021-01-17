const mongoose = require('mongoose');

const User = require('./user.js');
const DreamEntry = require('./dreamEntry.js');

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
};

const models = {User, DreamEntry};

module.exports.connectDb = connectDb;
module.exports.models = models;
