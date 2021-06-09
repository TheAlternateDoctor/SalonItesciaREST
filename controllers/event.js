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
    let newDateDebut = new Date(Date.parse(dateDebut))
    let newDateFin = new Date(Date.parse(dateFin))
    const results = await db.pool.query("INSERT INTO `event` (`nom`, `description`,`dateDebut`,`dateFin`) VALUES ('"+nom+"', '"+description+"', '"+
    newDateDebut.getFullYear()+"-"+newDateDebut.getMonth()+"-"+newDateDebut.getDate()+" "+newDateDebut.getHours()+":"+newDateDebut.getMinutes()+":00', '"+
    newDateFin.getFullYear()+"-"+newDateFin.getMonth()+"-"+newDateFin.getDate()+" "+newDateFin.getHours()+":"+newDateFin.getMinutes()+":00');").catch(error => hasError = error);
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
    let newDateDebut = new Date(Date.parse(dateDebut))
    let newDateFin = new Date(Date.parse(dateFin))
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
        query += "dateDebut = '"+newDateDebut.getFullYear()+"-"+newDateDebut.getMonth()+"-"+newDateDebut.getDate()+" "+newDateDebut.getHours()+":"+newDateDebut.getMinutes()+":00'";
        updated = true;
    }
    if(dateFin != undefined){
        if(updated) query+=','
        query += "dateFin = '"+newDateFin.getFullYear()+"-"+newDateFin.getMonth()+"-"+newDateFin.getDate()+" "+newDateFin.getHours()+":"+newDateFin.getMinutes()+":00'";
        updated = true;
    }
    query += "WHERE id = "+id;
    console.log(query)
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
    if(hasError==null && results[0]["affectedRows"]){
        var message = '{ "success":true }';
        return message;
    } else if(hasError){
        var message = '{ "success":false,'+
        '"message":"'+hasError.message+'"}';
        return message;
    }else {
        var message = '{ "success":false,'+
        '"message":"No item deleted."}';
        return message;
    }
}

module.exports = {findAll,find,create,update,destroy};