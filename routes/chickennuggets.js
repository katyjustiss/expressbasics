var express = require('express');
var router = express.Router();
var moment = require('moment');

var Order = require('../models/ChickenNuggets')

router.get('/', function(req, res) {
  var id = req.session.user._id;
  Order.findAllByUserId(id, function (err, orders) {
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
  var o = req.body;
  o.userId = req.session.user._id;
  Order.create(o, function() {
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
