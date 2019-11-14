var express = require('express');
var router = express.Router();
const  mongoose = require('mongoose');
const crypto = require('crypto');
let User = mongoose.model('user');
var session = require('express-session');
//router.use(session({secret:'secret',resave:true,saveUninitialized:false,cookie:{maxAge:1000*60*30}}));

function getRandomSalt() {
    return Math.random().toString().slice(2, 5);
}

function cryptPwd(password, salt){
    let saltPassword = password + ':' + salt;
    let md5 = crypto.createHash('md5');
    let result = md5.update(saltPassword).digest('hex');
    return result;
}

router.post('/',function (req,res) {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({username:username}).exec(function (err,user) {
        if(err){
            console.log(err);
        }else if(!user){
            //var err = new Error('UserNotExist');
            //err.status = 401;
            //res.json(err);
            res.json("usernotexist")
        }else{
            let pwd = cryptPwd(password,user.salt);
            if (user.password == pwd){
                req.session.username = username;
                req.session.save();
                res.json("success");
            }else {
                res.json("passwordwrong")
            }
        }
    })
});

module.exports = router;