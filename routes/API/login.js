var express = require('express');
var router = express.Router();
var fs = require('fs');


function authorize(req, res, next) {
   if (req.signedCookies.login) {
      next();
   } else {
      res.redirect('/');
   }
}

module.exports = router;
