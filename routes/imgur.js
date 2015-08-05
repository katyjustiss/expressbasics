var router = require('express').Router();
var upload  = require('multer')({dest: 'uploads/'})

router.get('/', function(req, res) {
  res.render('templates/imgur');
});

router.post('/upload', upload.single('file'), function(req, res) {
  console.log(req.file);
  res.redirect('/imgur');
});

module.exports = router;
