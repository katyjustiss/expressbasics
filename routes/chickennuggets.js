var express = require('express');
var router = express.Router();
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;

//var collection = global.db.collection('chickenNuggets')

router.get('/', function(req, res) {
  var collection = global.db.collection('chickenNuggets');

  collection.find().toArray(function(err, orders) {
    formattedOrders = orders.map(function(order) { //modifying the data obj
      return {
        _id: order._id,
        name: order.name,
        flavor: order.sauce,
        qty: order.qty,
        createdAt: moment(order._id.getTimestamp()).fromNow(),
        complete: order.complete
      };
    });
    res.render('templates/chicken-index', {orders: formattedOrders});
  });

});

router.get('/order', function(req, res) {
  res.render('templates/chicken-new');
});


router.post('/order', function(req, res) {
  var collection = global.db.collection('chickenNuggets');

  collection.save(req.body, function() {
    res.redirect('/chickennuggets');
  });

});

//on click set property of complete
router.post('/order/:id/complete', function(req, res) {
  var collection = global.db.collection('chickenNuggets');

  collection.update(
    {_id: ObjectID(req.params.id)},
    {$set: {complete: true}},
    function() {
      res.redirect('/chickennuggets');
  })

});


module.exports = router;
