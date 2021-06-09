const createHttpError = require("http-errors");
var db = require("../config/dbConfig.js");

async function findAll(){
    var hasError = null;
    const results = await db.pool.query("SELECT * FROM campus").catch(error => hasError = error);
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

module.exports = {findAll};