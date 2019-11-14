var express = require('express');
var router = express.Router();
const  mongoose = require('mongoose');
const crypto = require('crypto');
let User = mongoose.model('user');
var session = require('express-session');

router.get('/', function(req, res){
    console.log(req.session.username)
    req.session.username = null;
    res.json('logoutsuccess');
});

module.exports = router;