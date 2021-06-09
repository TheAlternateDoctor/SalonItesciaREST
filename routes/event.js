var express = require('express');
var router = express.Router();
var controller = require("../controllers/event.js");
const { check, validationResult } = require('express-validator');

/*GET events disponibles*/
router.get('/', function (req, res) {
    controller.findAll().then(result => {
        res.send(result);
        return;
    });
});

/*GET un event particulier*/
router.get('/:id', function (req, res) {
    const { id } = req.params;
    controller.find(id).then(result => {
        res.send(result);
        return;
    });
});

/*POST un event*/
router.post('/',
    async function (req, res) {
        var data = req.body;
        await check('nom').notEmpty().trim().escape().run(req);
        await check('description').notEmpty().trim().escape().run(req);
        await check('dateDebut').notEmpty().isISO8601().run(req);
        await check('dateFin').notEmpty().isISO8601().isAfter(data["dateDebut"]).run(req);
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        } else {
            controller.create(data["nom"], data["description"], data["dateDebut"], data["dateFin"]).then(result => {
                res.send(result);
                return;
            });
        }
    });

/*UPDATE un event*/
router.put('/:id',
    async function (req, res) {
        var data = req.body;
        const { id } = req.params;
        await check('nom').optional().trim().escape().run(req);
        await check('description').optional().trim().escape().run(req);
        await check('dateDebut').optional().isISO8601().run(req);
        await check('dateFin').optional().isISO8601().isAfter(data["dateDebut"]).run(req);
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        } else {
            controller.update(id,data["nom"], data["description"], data["dateDebut"], data["dateFin"]).then(result => {
                res.send(result);
                return;
            });
        }
    });

/*DELETE un event*/
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