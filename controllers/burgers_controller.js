var express = require('express');

var db = require('../models');

var router = express.Router();

router.get('/', function(req, res) {
  db.burgers.findAll({}).then(function(data) {
    var hbsObject = {
      burgers: data
    };
    res.render('index', hbsObject);
  });
});

router.post('/api/burgers', function(req, res) {
  db.burgers
    .create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    })
    .then(function(data) {
      res.redirect('/');
    });
});

router.put('/api/burgers/:id', function(req, res) {
  db.burgers
    .update(
      { devoured: true },
      {
        where: {
          id: req.params.id
        }
      }
    )
    .then(function(result) {
      if (result.changedRows === 0) {
        // no rows changed, ID does not exist
        return res.status(404).end();
      } else {
        res.redirect('/');
      }
    });
});

// export routes for server.js
module.exports = router;
