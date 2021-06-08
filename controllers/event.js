const createHttpError = require("http-errors");
const fs = require('fs')
var db = require("../config/dbConfig.js");

async function findAll(){
    var hasError = null;
    const results = await db.pool.query("SELECT * FROM event").catch(error => hasError = error);
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
    const results = await db.pool.query("SELECT * FROM event WHERE id = "+id).catch(error => hasError = error);
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

async function create(nom, description, dateDebut, dateFin){
    var hasError = null;
    const results = await db.pool.query("INSERT INTO `event` (`nom`, `description`,`dateDebut`,`dateFin`) VALUES ('"+nom+"', '"+description+"', '"+dateDebut+"', '"+dateFin+"');").catch(error => hasError = error);
    if(hasError==null){
        var message = '{ "success":true, "id":'+JSON.stringify(results[0]["insertId"])+"}";
        return message;
    } else {
        var message = '{ "success":false,'+
        '"message":"'+hasError.message+'"}';
        return message;
    }
}

async function update(id, nom, description, dateDebut, dateFin){
    var hasError = null;
    var updated = false;
    var query = "UPDATE event SET ";
    if(nom != undefined){
        query += "nom = '"+nom+"'";
        updated = true;
    }
    if(description != undefined){
        if(updated) query+=','
        query += "description = '"+description+"'";
        updated = true;
    }
    if(dateDebut != undefined){
        if(updated) query+=','
        query += "dateDebut = '"+dateDebut+"'";
        updated = true;
    }
    if(dateFin != undefined){
        if(updated) query+=','
        query += "dateFin = '"+dateFin+"'";
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

async function destroy(id){
    var hasError = null;
    const results = await db.pool.query("DELETE FROM event WHERE id="+id).catch(error => hasError = error);
    if(hasError==null){
        var message = '{ "success":true }';
        return message;
    } else {
        var message = '{ "success":false,'+
        '"message":"'+hasError.message+'"}';
        return message;
    }
}

module.exports = {findAll,find,create,update,destroy};