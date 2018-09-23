var express = require('express');

var burger = require('../models/burger.js');

var router = express.Router();

router.get('/', function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/api/burgers', function(req, res) {
  burger.create(
    ['burger_name', 'devoured'],
    [req.body.burger_name, req.body.devoured],
    function(result) {
      // res.json({ id: result.insertId });
      res.redirect('/');
    }
  );
});

router.put('/api/burgers/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;

  burger.update({ devoured: true }, condition, function(result) {
    if (result.changedRows === 0) {
      // no rows changed, ID does not exist
      return res.status(404).end();
    } else {
      // res.status(200).end();
      res.redirect('/');
    }
  });
});

// router.delete('/api/burgers/:id', function(req, res) {
//   var condition = 'id = ' + req.params.id;

//   burger.delete(condition, function(result) {
//     if (result.affectedRows === 0) {
//       // no rows changed, ID does not exist
//       return res.status(404).end();
//     } else {
//       // res.status(200).end();
//       res.redirect('/');
//     }
//   });
// });

// export routes for server.js
module.exports = router;
