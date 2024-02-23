const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup', (req, res) => {
    username = req.body.username ; 
    password = req.body.password ; 

    User.create({
        username,
        password
    })
    res.json({
        message: "User created Successfully"
    })
});

router.get('/courses', async (req, res) => {
    const response = await Course.find({}) ; 

    res.json({
        courses : response  
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId ; 
    const username = req.headers.username; 

    await User.updateOne({
        username:username 
    },{
        "$push":{
            purchasedCourses : courseId 
        }
    })
    res.json({
        message : "purchase Complete!"
    })


});


router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});



module.exports = router