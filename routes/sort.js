var express = require('express');
var router = express.Router();
const  mongoose = require('mongoose');
const crypto = require('crypto');
let User = mongoose.model('user');
let UserFile = mongoose.model('userfile')

var session = require('express-session');
//router.use(session({secret:'secret',resave:true,saveUninitialized:false,cookie:{maxAge:1000*60*30}}));

router.get('/',function (req,res) {

    UserFile.find().sort({score:-1}).exec(function (err, docu) {
        if(err){
            return err;
        }
        let files = [];
        if(docu.length >= 10){
            for(let i = 0;i<10;i++){
                files.push(docu.shift());
            }
            res.json(files);
        }else {
            res.json(docu);
        }
    })
});

module.exports = router;