var express = require('express');
var router = express.Router();
const  mongoose = require('mongoose');
const crypto = require('crypto');
let User = mongoose.model('user')
const FILE_PATH = "public/images/"
const fs = require('fs');

var session = require('express-session');
//router.use(session({secret:'secret',resave:true,saveUninitialized:false,cookie:{maxAge:1000*60*30}}));

function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}
router.post('/',function (req,res) {
    let username = req.body.username;
    let filename = req.body.filename;
    User.findOne({username:username},function (err,user) {
        if(err){
            return err;
        }
        if(!(isEmpty(user.img))){
            let out = fs.createReadStream(FILE_PATH+user.img)
            out.pipe(res);
        }
    })
});

module.exports = router;