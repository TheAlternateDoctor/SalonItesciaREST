const createHttpError = require("http-errors");
var db = require("../config/dbConfig.js");

async function findAll(){
    var hasError = null;
    const results = await db.pool.query("SELECT * FROM formations").catch(error => hasError = error);
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
    const results = await db.pool.query("SELECT * FROM formations WHERE id = "+id).catch(error => hasError = error);
    console.log(results[0].length);
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

async function create(nom, representant, forms = null){
    var hasError = null;
    if(forms === null)
        forms = ""
    const results = await db.pool.query("INSERT INTO `formations` (`nom`, `representant`, `forms`) VALUES ('"+nom+"', '"+representant+"', '"+forms+"');").catch(error => hasError = error);
    if(hasError==null){
        var message = '{ "success":true, "id":'+JSON.stringify(results[0]["insertId"])+"}";
        return message;
    } else {
        var message = '{ "success":false,'+
        '"message":"'+hasError.message+'"}';
        return message;
    }
}

async function update(id, nom, representant, forms){
    var hasError = null;
    var updated = false;
    var query = "UPDATE formations SET ";
    if(nom != ''){
        query += "nom = '"+nom+"'";
        updated = true;
    }
    if(representant != ''){
        if(updated) query+=','
        query += "representant = '"+representant+"'";
        updated = true;
    }
    if(forms != ''){
        if(updated) query+=','
        query += "forms = '"+forms+"'";
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
    const results = await db.pool.query("DELETE FROM formations WHERE id="+id).catch(error => hasError = error);
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