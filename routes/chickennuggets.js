var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('templates/chickennuggets');
});

router.post('/order', function(req, res) {
  var collection = global.db.collection('chickenNuggets')
  console.log(req.body);

  collection.save(req.body, function() {
    res.redirect('/');
  })

});

module.exports = router;
