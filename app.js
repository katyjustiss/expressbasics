var fs = require('fs');
//npm requires
var express = require('express');
var morgan = require('morgan');
var loggly = require('loggly');

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
app.use(require('less-middleware')('public'));

//logging
// app.use(function(req, res, next) {
//   console.log('Request at ' + new Date().toISOString());
//   next();
// });
//Write logs to file.
var logStream = fs.createWriteStream('access.log', {flags: 'a'});
app.use(morgan('combined', {stream: logStream}));
app.use(morgan('dev'));

var client = loggly.createClient({
    token: "41698293-05d9-4603-a8e8-0b82920849df",
    subdomain: "katyjustiss",
    tags: ["NodeJS"],
    json:true
});

//can just trim this down to what you want
app.use(function(req, res, next) {
  client.log({req: req.ip,
              date: new Date().toISOString(),
              url: req.url,
              status: res.statusCode,
              method: req.method
            });
  next();
})

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
