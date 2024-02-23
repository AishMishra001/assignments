const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Radhe:shyam@cluster0.oj1j8x6.mongodb.net/Course_selling_app2');



// Define schemas
const AdminSchema = new mongoose.Schema({
    username:String , 
    password:String
});
const jwt = require("jsonwebtoken")
const UserSchema = new mongoose.Schema({
    username:String , 
    password:String ,
    purchasedCourses: [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
   title : String , 
   description : String , 
   image : String , 
   price : Number 
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}