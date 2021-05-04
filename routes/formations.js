var express = require('express');
var router = express.Router();
var controller = require("../controllers/formations.js")
const { check } = require('express-validator');

/*GET formations disponibles*/
router.get('/', function(req, res) {
  controller.findAll().then(result => {
    res.send(result);
    return;
  });
});

/*GET une formation particulière*/
router.get('/:id', function(req, res) {
  const { id } = req.params;
  controller.find(id).then(result => {
    res.send(result);
    return;
  });
});

/*POST formations disponibles*/
router.post('/',
  check('nom').not().isEmpty().trim().escape(),
  check('representant').not().isEmpty().trim().escape(),
  check('forms').not().isEmpty().trim().escape(),
  function(req, res) {
  var data = req.body;
  controller.create(data["nom"],data["representant"],data["forms"]).then(result => {
    res.send(result);
    return;
  });
});

/*UPDATE a formations*/
router.put('/:id',
  check('nom').not().isEmpty().trim().escape(),
  check('representant').not().isEmpty().trim().escape(),
  check('forms').not().isEmpty().trim().escape(),
  function(req, res) {
  const { id } = req.params;
  var data = req.body;
  controller.update(id,data["nom"],data["representant"],data["forms"]).then(result => {
    res.send(result);
    return;
  });
});

router.delete('/:id',
  function(req, res) {
  const { id } = req.params;
  var data = req.body;
  controller.destroy(id).then(result => {
    res.send(result);
    return;
  });
});

module.exports = router;