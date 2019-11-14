var express = require('express');
var router = express.Router();
const  mongoose = require('mongoose')
let Book = mongoose.model('book')
let user = mongoose.model('user')
let userfile = mongoose.model('userfile')
router.get('/', function(req, res, next) {
    userfile.find({},function (err,user) {
        res.json(user)
    })
});
module.exports = router;