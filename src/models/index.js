const mongoose = require('mongoose');

const User = require('./user.js');
const Dream = require('./dream.js');

const connectDb = () => {
    return mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});
};

const models = {User, Dream};

module.exports.connectDb = connectDb;
module.exports.models = models;
