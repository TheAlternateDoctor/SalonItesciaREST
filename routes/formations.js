var express = require('express');
var controller = require("../controllers/formations.js");
const { check } = require('express-validator');
const standCtrl = require("../controllers/stand.js")
var oauth = require("express-oauth-server");

module.exports = (router, app) =>{
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

  /*GET les stands d'une formation particulière*/
  router.get('/:id/stands', function(req, res) {
    const { id } = req.params;
    controller.findStands(id).then(result => {
      res.send(result);
      return;
    });
  });

  /*POST une nouvelle formation*/
  router.post('/',
    app.oauth.authenticate(),
    check('nom').not().isEmpty().trim().escape(),
    check('representant').not().isEmpty().trim().escape(),
    check('forms').not().isEmpty().trim().escape(),
    check('idCampus').not().isEmpty().notEmpty().isInt(),
    function(req, res) {
    var data = req.body;
    controller.create(data["nom"],data["representant"],data["forms"],data["idCampus"]).then(result => {
      res.send(result);
      return;
    });
  });

  /*POST un stand sur une formation*/
  router.post('/:id/stands',
    app.oauth.authenticate(),
    check('idStand').not().isEmpty().isInt(),
    function(req, res) {
    var data = req.body;
    const { id } = req.params;
    controller.createStand(id,data["idStand"]).then(result => {
      res.send(result);
      return;
    });
  });

  /*UPDATE une formation*/
  router.put('/:id',
    app.oauth.authenticate(),
    check('nom').not().isEmpty().trim().escape(),
    check('representant').not().isEmpty().trim().escape(),
    check('forms').not().isEmpty().trim().escape(),
    check('idCampus').notEmpty().isInt(),
    function(req, res) {
    const { id } = req.params;
    var data = req.body;
    controller.update(id,data["nom"],data["representant"],data["forms"],data["idCampus"]).then(result => {
      res.send(result);
      return;
    });
  });

  /*DELETE une formation*/
  router.delete('/:id',
    app.oauth.authenticate(),
    function(req, res) {
    const { id } = req.params;
    var data = req.body;
    controller.destroy(id).then(result => {
      res.send(result);
      return;
    });
  });
  return router
}