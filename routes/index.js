var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('Hello World!');
});

// app.get(/hello/, function(req, res) {

// })

router.get('/awesomethings', function(req, res) {
  var collection = global.db.collection('awesomeThings');

  collection.find().toArray(function(err, things) {
    res.render('templates/world',
      {
        welcome: 'Thanks for visiting!',
        awesomeThings: things
      }
    );
  });

});

router.get('/test', function(req, res, next) {
  res.write('Test1!');
  next();
});

router.get('/test', function(req, res) {
  res.end('Test2!');
});

router.get('/json', function(req, res) {
  res.send({an: 'object'});
});

router.get('/thisshoulderror', function(req, res) {
  res.send(badVariable);
});

module.exports = router;
