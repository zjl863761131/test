var express = require('express');
var router = express.Router();
const  mongoose = require('mongoose');
const crypto = require('crypto');
let UserFile = mongoose.model('userfile')

var session = require('express-session');
//router.use(session({secret:'secret',resave:true,saveUninitialized:false,cookie:{maxAge:1000*60*30}}));

router.post('/',function (req,res) {
    let username = req.body.username;
    let files = [];
    UserFile.find({username: username}, function (err, allfile) {
        if (err) {
            return err;
        }
        for (let file of allfile) {
            files.push(file);
        }
        res.json(files);
    });
});

module.exports = router;