var express = require('express');
var router = express.Router();

var app = require('../app');
var User = require('../models/User');

router.get('/login', function loginUser(req,res) {
  res.render('user/login');
})

router.post('/login', function doLogin(req,res) {
  User.login(req.body, function(err, user) {
    req.session.regenerate(function() {
      req.session.user = user;
      res.redirect('/');
    });
  });
});

//reguster page
router.get('/new', function newUser(req, res) {
  res.render('user/new');
})

//perform registration
router.post('/', function createUser(req, res) {
  User.create(req.body, function(err) {
    if(err) {
      res.render('user/new', {err:err});
    } else {
      res.redirect('/')
    }
  })
})

module.exports = router;
