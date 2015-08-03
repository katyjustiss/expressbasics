//npm requires
var express = require('express');

//required routes
var routes = require('./routes/index')
var pizza = require('./routes/pizza');

//variables
var app = express();

//settings
//letting express know about ejs
app.set('view engine', 'ejs');
// app.set('case sensitive routing', true);
// app.set('strict routing', true);

app.locals.title = 'aweso.me';

//middlewares
//logging
app.use(require('less-middleware')('public'));

app.use(function(req, res, next) {
  console.log('Request at ' + new Date().toISOString());
  next();
});

app.use(express.static('public'));

//routes
app.use('/', routes);
app.use('/pizza', pizza);

//errors
app.use(function (req, res, next) {
  res.status(403);
  res.send('Unauthorized');
});

app.use(function (err, req, res, next) {
  //must pass 4 arguments
  console.log('ERRRRRRR', err.stack);
  res.status(500).send('My fault');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
