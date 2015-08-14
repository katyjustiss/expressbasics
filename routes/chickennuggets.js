var express = require('express');
var router = express.Router();
var moment = require('moment');

var Order = require('../models/ChickenNuggets')

//var collection = global.db.collection('chickenNuggets')

router.get('/', function(req, res) {
  Order.findAll(function (err, orders) {
      res.render('templates/chicken-index', {orders: formatAllOrders(orders)})
  });

  function formatAllOrders(orders) {
    return orders.map(function(order) {
      order.flavor = order.sauce;
      order.createdAt = moment(order._id.getTimestamp()).fromNow();
      delete order.sauce;
      return order;
    })
  }

});

router.get('/order', function(req, res) {
  res.render('templates/chicken-new');
});


router.post('/order', function(req, res) {
  var order = new Order(req.body);
  order.save(function() {
    res.redirect('/chickennuggets')
  })

});

//on click set property of complete
router.post('/order/:id/complete', function(req, res) {
  Order.findById(req.params.id, function(err, order) {
    order.complete(function() {
    res.redirect('/chickennuggets');
    });
  });
});


module.exports = router;
