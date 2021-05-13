var express = require('express');
var router = express.Router();
var controller = require("../controllers/stand.js")
const { check } = require('express-validator');

/*GET stands disponibles*/
router.get('/', function(req, res) {
  controller.findAll().then(result => {
    res.send(result);
    return;
  });
});

/*GET un stand particulier*/
router.get('/:id', function(req, res) {
  const { id } = req.params;
  controller.find(id).then(result => {
    res.send(result);
    return;
  });
});

/*GET une formation lié au stand*/
router.get('/:id/formation', function(req, res) {
  const { id } = req.params;
  controller.find(id).then(result => {
    res.send(result);
    return;
  });
});

/*POST un stand*/
router.post('/',
  check('idFormation').not().isEmpty(),
  check('flyer').not().isEmpty().trim().escape(),
  check('meet').not().isEmpty().trim().escape(),
  check('ecran').not().isEmpty().trim().escape(),
  function(req, res) {
  var data = req.body;
  controller.create(data["nom"],data["representant"],data["forms"]).then(result => {
    res.send(result);
    return;
  });
});

/*UPDATE un stand*/
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

/*DELETE un stand*/
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