var express = require('express');
var router = express.Router();
const  mongoose = require('mongoose');
const crypto = require('crypto');
let UserFile = mongoose.model('userfile')
const fs = require('fs');

var session = require('express-session');
//router.use(session({secret:'secret',resave:true,saveUninitialized:false,cookie:{maxAge:1000*60*30}}));

router.post('/',function (req,res) {
    let username = req.body.username;
    let filename = req.body.filename;
    UserFile.findOne({username:username,filename:filename},function (err,photofile) {
        if(err){
            return err;
        }
        let out = fs.createReadStream(photofile.filepath)
        out.pipe(res);
    })
});

module.exports = router;