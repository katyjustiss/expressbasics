var fs = require('fs');
//npm requires
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser')

//required routes
var routes = require('./routes/index')
var pizza = require('./routes/pizza');
var chickennuggets = require('./routes/chickennuggets')
var imgur = require('./routes/imgur')

//variables
var app = express();

require('./lib/secrets');

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

//can just trim this down to what you want
app.use(function(req, res, next) {
  var client = require('./lib/loggly')('incoming'); //the tag
  client.log({ip: req.ip,
              date: new Date().toISOString(),
              url: req.url,
              status: res.statusCode,
              method: req.method
            });
  next();
})

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}))

//routes
app.use('/', routes);
app.use('/pizza', pizza);
app.use('/chickennuggets', chickennuggets);
app.use('/imgur', imgur);

//errors
app.use(function (req, res, next) {
  res.status(403);
  res.send('Unauthorized');
});

app.use(function (err, req, res, next) {
  var client = require('./lib/loggly')('error'); //the tag
  client.log({ip: req.ip,
              date: new Date().toISOString(),
              url: req.url,
              status: res.statusCode,
              method: req.method,
              err: err.stack
            });
  //must pass 4 arguments
  console.log('ERRRRRRR', err.stack);
  res.status(500).send('My fault');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
