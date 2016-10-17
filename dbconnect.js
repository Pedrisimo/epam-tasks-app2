"use strict";
let db = require('mysql');
let connection = db.createConnection({
    port: '3306',
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'local'
});
function getDBRecs(callback) {
    connection.query('SELECT * from persons', callback);
}

function setDBRecs(data, callback) {
    console.log(JSON.stringify(data));
    if(!data.hasOwnProperty('id')) { 
        connection.query('INSERT INTO persons SET ?', data, callback);
    }
    else {
    	connection.query('UPDATE persons SET name =?, email =?, phone =? WHERE id =?', [data.name, data.email, data.phone, data.id], callback);
    }
}

function rmDBRecs(data, callback) {
    connection.query('DELETE from persons WHERE id = ?', data.id, callback);
}
module.exports = {getDBRecs : getDBRecs, setDBRecs : setDBRecs, rmDBRecs : rmDBRecs};