const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema
({
    
name : String,
email: String,
mobileno: Number , 
designation: String,
gender: String,  // New field for radio button
course: [String],  // New field for checkboxes (array of strings)
//photo: String, // Store the file path
});



module.exports = mongoose.model('employees',  employeeSchema) //first parameter is collection name and second one is object name (above the name)