var express = require('express');
var router = express.Router();

//var collection = global.db.collection('chickenNuggets')

router.get('/', function(req, res) {
  var collection = global.db.collection('chickenNuggets');

  collection.find().toArray(function(err, orders) {
    formattedOrders = orders.map(function(order) { //modifying the data obj
      return {
        name: order.name,
        flavor: order.style,
        qty: order.qty,
        createdAt: order._id.getTimestamp()
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
    res.redirect('/');
  })

});

module.exports = router;
