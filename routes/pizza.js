var express = require('express');
var router = express.Router();


router.get('/:topping/:qty', function(req, res) {
  var obj = req.params;
  // obj.title = 'Pizza Shop';
  res.render('templates/pizza', obj);
});

module.exports = router;
