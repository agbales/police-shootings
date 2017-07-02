var express = require('express');
var router = express.Router();

/* GET WP Police Data. */
router.get('/', function(req, res, next) {

  var columns = ["id","name","date","manner_of_death","armed","age","gender","race","city","state","signs_of_mental_illness","threat_level","flee","body_camera"];
  require("csv-to-array")({
     file: "./public/data/fatal-police-shootings-data.csv",
     columns: columns
  }, function (err, array) {
    console.log(err || 'json sent to front end');
    res.json(array);
  });

});

module.exports = router;
