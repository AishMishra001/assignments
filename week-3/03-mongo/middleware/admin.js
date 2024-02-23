const {Admin} = require("../db")

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    username = req.headers.username , 
    password = req.headers.password , 

    Admin.findOne({
        username : username ,
        password : password 
    })
    .then(function(value){
        if(value){
            next() ; 
        } else {
            res.status(403).json({
                msg:"Admin doesn't exist"
            })
        }
        })

    
}

module.exports = adminMiddleware;