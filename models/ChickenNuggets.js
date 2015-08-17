var _ = require('lodash');
var ObjectID = require('mongodb').ObjectID;

function Order(o) {
  this.userId = ObjectID(o.userId);
  this.name = o.name;
  this.style = o.style;
  this.qty = o.qty;
  this.createdAt = new Date();
  this.complete = false;
  this.cost = this.qty * 0.25;
}

Object.defineProperty(Order, 'collection', {
  get: function() {
    return global.db.collection('chickenNuggets');
  }
})

Order.create = function(o, cb) {
  var order = new Order(o);
  order.save(cb);
}

Order.prototype.save = function(cb) {
  Order.collection.save(this, cb);
}

Order.prototype.complete = function(cb) { //instance method
  Order.collection.update(
    {_id: this._id}, //getting it from the findById
    {$set: {complete: true}}
  , cb);
}

Order.findAllByUserId = function(id, cb) {
  Order.collection.find({userId: ObjectID(id)}).toArray(function(err, orders) {
    var prototypedOrders = orders.map(function(order) {
      return setPrototype(order);
    });
    cb(err, prototypedOrders);
  });
};

Order.findById = function(id, cb) { //class method
  Order.collection.find({_id: ObjectID(id)}, function(err, order) {
    cb(err, setPrototype(order));
  });
};

Order.findAll = function(cb) {
  Order.collection.find().toArray(function (err, orders) {
    var ordersProto = orders.map(function(order) {
      return setPrototype(order); //setting the prototype of each indiv order
    });
    cb(err, ordersProto);
  });
};

module.exports = Order;

//shorthand method
function setPrototype(pojo) {
  return _.create(Order.prototype, pojo);
}





