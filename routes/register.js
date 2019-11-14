var express = require('express');
var router = express.Router();
const  mongoose = require('mongoose')
let User = mongoose.model('user')
const crypto = require('crypto');

function getRandomSalt() {
    return Math.random().toString().slice(2, 5);
}

function cryptPwd(password, salt){
    let saltPassword = password + ':' + salt;
    let md5 = crypto.createHash('md5');
    let result = md5.update(saltPassword).digest('hex');
    return result;
}

router.get('/', function(req, res, next) {
    User.find({},function (err,newUser) {
        res.json(newUser);
    })
});

router.post('/',function (req,res) {
    let username = req.body.username;
    let password = req.body.password;
    let createtime = new Date();
    let salt = createtime +getRandomSalt();
    let newPassword = cryptPwd(password, salt);

    let AddUser = {username:username,password:newPassword,createtime:createtime,salt:salt};

    User.findOne({username:username}).exec(function (err,user) {
        if(err){
            //console.log(err);
            res.json("somethingwrong")
        }else if(user){
            // var err = new Error('UserExist');
            // err.status = 401;
            // console.log(err);
            res.json("userexist")
        }else{
            User.create(AddUser,function (err,newUser) {
                res.json("success")
            })
        }
    })
});

module.exports = router;