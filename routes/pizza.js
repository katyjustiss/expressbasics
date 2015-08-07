var express = require('express');
var router = express.Router();
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;


router.get('/', function(req, res) {
  var collection = global.db.collection('pizza');
  // var obj = {
  //   qty: req.query.qty || 1,
  //   topping: req.query.topping || 'cheese'
  // };
  collection.find().toArray(function(err, orders) {
    formattedOrders = orders.map(function(order) {
      return {
        _id: order._id,
        name: order.name,
        qty: order.qty,
        topping: order.topping,
        createdAt: moment(order._id.getTimestamp()).fromNow(),
        complete: order.complete
      };
    });
    res.render('templates/pizza-orders', {orders: formattedOrders});
  });

});

router.get('/order', function(req, res) {
  res.render('templates/pizza-new');
});


router.post('/order', function(req, res) {
  var collection = global.db.collection('pizza');

  collection.save(req.body, function() {
    res.redirect('/pizza');
  });

});

//on click set property of complete
router.post('/order/:id/complete', function(req, res) {
  var collection = global.db.collection('pizza');

  collection.update(
    {_id: ObjectID(req.params.id)},
    {$set: {complete: true}},
    function() {
      res.redirect('/pizza');
  })

});


module.exports = router;
