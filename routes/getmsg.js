var express = require('express');
var router = express.Router();
const  mongoose = require('mongoose');
const crypto = require('crypto');
let User = mongoose.model('user');
let UserFile = mongoose.model('userfile')

var session = require('express-session');
//router.use(session({secret:'secret',resave:true,saveUninitialized:false,cookie:{maxAge:1000*60*30}}));

router.post('/',function (req,res) {
    let username = req.body.username;
    let num = 0;
    UserFile.count({username:username},function (err,count) {
        if(err){
            return err;
        }
        num = count;
    })

    User.findOne({username:username}).exec(function (err,user) {
        let usermsg={
            username:user.username,
            createtime:user.createtime,
            num:num,
            img:user.img
        }
        res.json(usermsg);
    })

});

module.exports = router;