var express = require('express');
var router = express.Router();
var controller = require("../controllers/stand.js");
var formidable = require('formidable');
const { check, validationResult } = require('express-validator');

/*GET stands disponibles*/
router.get('/', function (req, res) {
  controller.findAll().then(result => {
    res.send(result);
    return;
  });
});

/*GET un stand particulier*/
router.get('/:id', function (req, res) {
  const { id } = req.params;
  controller.find(id).then(result => {
    res.send(result);
    return;
  });
});

/*GET les formations liées au stand*/
router.get('/:id/formations', function (req, res) {
  const { id } = req.params;
  controller.findFormations(id).then(result => {
    res.send(result);
    return;
  });
});

/*GET les flyers de la formation*/
router.get('/:id/flyers', function (req, res) {
  const { id } = req.params;
  controller.findFlyer(id).then(result => {
    res.setHeader('content-type', 'image/png')
    res.end(result);
    return;
  });
});

/*POST un stand*/
router.post('/',
  async function (req, res) {
    await check('meet').notEmpty().trim().escape().run(req);
    var data = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    } else {
      controller.create(data["meet"]).then(result => {
        res.send(result);
        return;
      });
    }
  });

/*POST une nouvelle formation liée au stand*/
router.get('/:id/formations',
  check('idFormation').not().isEmpty(), function (req, res) {
    const { id } = req.params;
    var data = req.body;
    controller.addFormation(id, data["idFormation"]).then(result => {
      res.send(result);
      return;
    });
  });

/*POST le flyer qui va avec*/
router.post('/:id/flyer',
  function (req, res) {
    var form = new formidable.IncomingForm();
    console.log(req.body)
    form.parse(req, function (err, fields, files) {
      controller.createFlyer(files.flyer.path).then(result => {
        res.end(result);
        return;
      });
    })
  });

/*UPDATE un stand*/
router.put('/:id',
  check('idFormation').not().isEmpty(),
  check('meet').not().isEmpty().trim().escape(),
  function (req, res) {
    const { id } = req.params;

    var data = req.body;
    controller.update(id, data["idFormation"], data["meet"]).then(result => {
      res.send(result);
      return;
    });
  });

/*UPDATE un flyer*/
router.put('/:id/flyer',
  function (req, res) {
    const { id } = req.params;
    var data = req.body;
    controller.update(id, data["flyer"]).then(result => {
      res.send(result);
      return;
    });
  });

/*DELETE un stand*/
router.delete('/:id',
  function (req, res) {
    const { id } = req.params;
    var data = req.body;
    controller.destroy(id).then(result => {
      res.send(result);
      return;
    });
  });

module.exports = router;