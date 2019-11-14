const fs = require('fs');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer')
let uploads = multer({ dest: 'uploads/'})
const FILE_PATH = "public/images/"
let user = mongoose.model('user')

//router.use(express.static('public'))

router.get('/', function(req, res, next) {
    userfile.find({},function (err,newUserfile) {
        res.json(newUserfile);
    })
});

router.post('/', uploads.single('files'), function (req, res, next) {
    let filename = req.file.originalname;
    let filepath = FILE_PATH + req.file.originalname;
    let username = req.body.username;
    //let uploadtime = Date();
    //let age = req.body.age;
   // let score = req.body.score;
    let output = fs.createWriteStream(filepath)
    let input = fs.createReadStream(req.file.path)
    input.pipe(output)

    user.updateOne({username:username},{img:filename},function (err,user) {
        res.json("success")
    })
})

module.exports = router;