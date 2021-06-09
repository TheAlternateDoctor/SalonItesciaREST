const createHttpError = require("http-errors");
const fs = require('fs')
var db = require("../config/dbConfig.js");

async function findAll(){
    var hasError = null;
    const results = await db.pool.query("SELECT id, meet, ecranType FROM stands").catch(error => hasError = error);
    if(hasError==null){
        var message = '{ "success": true,'+
        '"results":'+ JSON.stringify(results[0])+"}";
        return message
    } else {
        var message = '{ "success":false,'+
        '"message":"'+hasError.message+'"}';
        return message;
    }
}

async function find(id){ 
    var hasError = null;
    const results = await db.pool.query("SELECT id, meet, ecranType FROM stands WHERE id = "+id).catch(error => hasError = error);
    if(hasError==null && results[0].length != 0){
        var message = '{ "success": true,'+
        '"results":'+ JSON.stringify(results[0][0])+"}";
        return message;
    }
    else if(hasError!=null){
        var message = '{ "success":false,'+
        '"message":"'+hasError.message+'"}';
        return message;
    }
    else {
        var message = '{ "success":false,"message":"No object for id '+id+'"}';
        return message;
    }
}

async function findEcran(id){ 
    var hasError = null;
    const results = await db.pool.query("SELECT ecran FROM stands WHERE id = "+id).catch(error => hasError = error);
    if(hasError==null && results[0].length != 0){
        return results[0][0]["ecran"];
    }
    else if(hasError!=null){
        var message = '{ "success":false,'+
        '"message":"'+hasError.message+'"}';
        return message;
    }
    else {
        var message = '{ "success":false,"message":"No object for id '+id+'"}';
        return message;
    }
}

async function findFormations(id){ 
    var hasError = null;
    const results = await db.pool.query("SELECT f.id,f.nom,f.representant,f.forms,c.id AS 'idCampus',c.nom AS 'nomCampus',c.localisation AS 'lieuCampus' FROM formations AS f, campus AS c WHERE f.id = (SELECT idFormation FROM `lienformationstand` WHERE idStand="+id+") AND c.id=f.idCampus").catch(error => hasError = error);
    if(hasError==null && results[0].length != 0){
        var message = '{ "success": true,'+
        '"results":'+ JSON.stringify(results[0])+"}";
        return message;
    }
    else if(hasError!=null){
        var message = '{ "success":false,'+
        '"message":"'+hasError.message+'"}';
        return message;
    }
    else {
        var message = '{ "success":false,"message":"No object for id '+id+'"}';
        return message;
    }
}

async function create(meet = null){
    var hasError = null;
    console.log("INSERT INTO `stands` (`meet`) VALUES ('"+meet+"');");
    const results = await db.pool.query("INSERT INTO `stands` (`meet`) VALUES ('"+meet+"') RETURNING id, meet, ecranType;").catch(error => hasError = error);
    if(hasError==null){
        var message = '{ "success":true, "data":'+JSON.stringify(results[0])+"}";
        return message;
    } else {
        var message = '{ "success":false,'+
        '"message":"'+hasError.message+'"}';
        return message;
    }
}

async function createFormation(id,idFormation){
    var hasError = null;
    console.log("INSERT INTO `stands` (`idFormation`, `idStand`) VALUES ("+idFormation+", '"+id+"');");
    const results = await db.pool.query("INSERT INTO `lienformationstand` (`idFormation`, `idStand`) VALUES ("+idFormation+", '"+id+"');").catch(error => hasError = error);
    if(hasError==null){
        var message = '{ "success":true, "id":'+JSON.stringify(results[0]["insertId"])+"}";
        return message;
    } else {
        var message = '{ "success":false,'+
        '"message":"'+hasError.message+'"}';
        return message;
    }
}

async function update(id, idFormation, meet){
    var hasError = null;
    var updated = false;
    var query = "UPDATE stands SET ";
    if(idFormation != ''){
        query += "idFormation = "+idFormation+"";
        updated = true;
    }
    if(meet != ''){
        if(updated) query+=','
        query += "meet = '"+meet+"'";
        updated = true;
    }
    query += "WHERE id = "+id;
    const results = await db.pool.query(query).catch(error => hasError = error);
    if(hasError==null){
        var message = '{ "success":true }';
        return message;
    } else {
        var message = '{ "success":false,'+
        '"message":"'+hasError.message+'"}';
        return message;
    }
}

async function updateFlyer(flyer){
    var hasError = null;
    var updated = false;
    var query = "UPDATE stands SET ";
    query += "flyer = '"+flyer+"'";
    query += "WHERE id = "+id;
    const results = await db.pool.query(query).catch(error => hasError = error);
    if(hasError==null){
        var message = '{ "success":true }';
        return message;
    } else {
        var message = '{ "success":false,'+
        '"message":"'+hasError.message+'"}';
        return message;
    }
}

async function destroy(id){
    var hasError = null;
    const results = await db.pool.query("DELETE FROM stands WHERE id="+id).catch(error => hasError = error);
    if(hasError==null){
        var message = '{ "success":true }';
        return message;
    } else {
        var message = '{ "success":false,'+
        '"message":"'+hasError.message+'"}';
        return message;
    }
}

module.exports = {findAll,find,findFormations,findEcran,create,createFormation,update,updateFlyer,destroy};