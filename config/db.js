const mongoose = require('mongoose');
const Category = require('../models/Category')

require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Category.init();
        console.log('MongoDB has been connected to the database');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
