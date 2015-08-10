var mongo = require('mongodb').MongoClient;

var url = process.env.MONGODB_URL;

//don't want to connect if already connected
if(!global.db) {
  mongo.connect(url, function(err, db) {
    global.db = db; //available everywhere
  });
}

