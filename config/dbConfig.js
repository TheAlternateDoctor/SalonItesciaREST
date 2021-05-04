var mysql = require('mysql2');
var pool = mysql.createPool({
    waitForConnections  : true,
    connectionLimit     : 10,
    host                : 'localhost',
    user                : 'root',
    database            : 'itescia'
}).promise();

async function findAll(table){
    const promisePool = pool.promise();
    return await promisePool.query("SELECT * FROM "+table);
}

function find(table, id){ 
    pool.query("SELECT * FROM "+table+ "WHERE id = "+id, function(error, results, fields){
        if(error) return false;
        return results[0];
    });
}

module.exports = {pool};