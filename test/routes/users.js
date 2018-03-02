var express = require('express'),
    router = express.Router();

router.get('/', function(req, res, next) {
  // send 可以处理纯文本和JSON
  res.send('users');
});

module.exports = router;