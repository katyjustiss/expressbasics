var express = require('express');
var app = express();

app.set('view engine', 'ejs');

//logging
app.use(function(req, res, next) {
  console.log('Request at ' + new Date().toISOString());
  next();
});

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/pizza/:topping/:qty', function(req, res) {
  var obj = req.params;
  obj.title = 'Pizza Shop';
  res.render('templates/pizza', obj);
});

app.get('/awesomethings', function(req, res) {
  setTimeout(function() {
    var awesomeThings = [
      'Pizza',
      'Bacon',
      '2nd Ammendment',
      'Pluto',
      'Space Jam'
    ];
    res.render('templates/world',
      {title: 'Awesomesite.com',
      welcome: 'Thanks for visiting!',
      awesomeThings: awesomeThings
    });
}, 5000);
});

app.get('/test', function(req, res, next) {
  res.write('Test1!');
  next();
});

app.get('/test', function(req, res) {
  res.end('Test2!');
});

app.get('/json', function(req, res) {
  res.send({an: 'object'});
});

app.get('/thisshoulderror', function(req, res) {
  res.send(badVariable);
});

app.use(function (req, res, next) {
  res.status(403);
  res.send('Unauthorized');
});

//must pass 4 arguments
app.use(function (err, req, res, next) {
  console.log('ERRRRRRR', err.stack);
  res.status(500).send('My fault');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
