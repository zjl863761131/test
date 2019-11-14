const fs = require('fs');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
//const multer = require('multer')
let userfiletmp = mongoose.model('userfiletmp')

//router.use(express.static('public'))

router.get('/', function(req, res, next) {
    userfile.find({},function (err,newUserfile) {
        res.json(newUserfile);
    })
});

router.post('/', function (req, res,) {
    //let filename = req.file.originalname;
    let username = req.body.username;
    let filename = req.body.filename;
    filename.replace(".","");
    let uploadtime = Date();
    let age = req.body.age;
    let score = req.body.score;
    let img = req.body.files
    console.log(img);
    let path = "public/images/"+username+filename+".txt"
    fs.writeFile(path,img,function (err) {
        if(err){
            console.log(err)
            return;
        }
    })
    let UserFileTmp = {username:username,filename:filename,uploadtime:uploadtime,age:age,score:score,img:path}
    userfiletmp.create(UserFileTmp,function (err,filetmp) {
        if(err){
            return err;
        }
        res.json("success");
    })
})

module.exports = router;