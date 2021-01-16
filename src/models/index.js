const mongoose = require('mongoose');

const User = require('./user');
const Message = require('./message');
const DreamEntry = require('./dreamEntry');

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
};

const models = {User, Message};

module.exports.connectDb = connectDb;
module.exports.models = models;
