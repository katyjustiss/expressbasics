var express = require('express');
var router = express.Router();
var moment = require('moment');

//var collection = global.db.collection('chickenNuggets')

router.get('/', function(req, res) {
  var collection = global.db.collection('chickenNuggets');

  collection.find().toArray(function(err, orders) {
    formattedOrders = orders.map(function(order) { //modifying the data obj
      return {
        name: order.name,
        flavor: order.style,
        qty: order.qty,
        createdAt: moment(order._id.getTimestamp()).fromNow()
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
    res.redirect('/chickennuggets/order');
  })

});

module.exports = router;
