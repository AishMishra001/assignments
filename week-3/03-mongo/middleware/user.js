const { User } = require("../db");

function userMiddleware(req, res, next) {
   const username = req.body.username ;
   const password = req.body.password ;

   User.findOne({
    username:username ,
    password: password 
   })
   .then(function(value){
    if(value){
        next();
    }else{
        res.status(403).json({
            msg:"User doesnot exist"
        })
    }
   })
}

module.exports = userMiddleware;