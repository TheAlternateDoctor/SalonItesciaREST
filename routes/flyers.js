var express = require('express');
var controller = require("../controllers/flyers.js");
const { check } = require('express-validator');
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

  /*POST une nouvelle formation*/
  router.post('/',
    app.oauth.authenticate(),
    check('nom').not().isEmpty().trim().escape(),
    check('flyer').not().isEmpty().trim().escape(),
    function(req, res) {
    var data = req.body;
    controller.create(data["nom"],data["representant"],data["forms"]).then(result => {
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
    function(req, res) {
    const { id } = req.params;
    var data = req.body;
    controller.update(id,data["nom"],data["representant"],data["forms"]).then(result => {
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