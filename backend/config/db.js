// connect to database called mern-post

const express = require('express');
const mongoose = require('mongoose');

const connectDB = ()=>{


mongoose
  .connect(
    process.env.MONGO_URI || 'mongodb://localhost:27017/mern-post2',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
    process.exit(1);
  });

}

  module.exports = connectDB;