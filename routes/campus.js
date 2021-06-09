var express = require('express');
var router = express.Router();
var controller = require("../controllers/campus.js");

/*GET events disponibles*/
router.get('/', function (req, res) {
    controller.findAll().then(result => {
        res.send(result);
        return;
    });
});

module.exports = router;