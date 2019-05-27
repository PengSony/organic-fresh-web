const mongoose = require('mongoose');

const User = require('./user.js');
// import Message from './message';

const connectDb = () => {
    return mongoose.connect('mongodb://localhost:27017/organic-fresh');
};

const models = { User };

module.exports = connectDb;

module.exports = models;