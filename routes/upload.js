const fs = require('fs');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer')
let uploads = multer({ dest: 'uploads/'})
const FILE_PATH = "public/images/"
let userfile = mongoose.model('userfile')

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
    let uploadtime = Date();
    let age = req.body.age;
    let score = req.body.score;
    let output = fs.createWriteStream(filepath)
    let input = fs.createReadStream(req.file.path)
    input.pipe(output)

    let addfile = {username:username,filename:filename,filepath:filepath,uploadtime:uploadtime,age:age,score: score}
    userfile.create(addfile, function (err, newfile) {
        res.json("success")
    })
})

module.exports = router;