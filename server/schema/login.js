const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema
({
    username: String,
    password: String
})

module.exports = mongoose.model('login',  loginSchema) //first parameter is collection name and second one is object name (above the name)