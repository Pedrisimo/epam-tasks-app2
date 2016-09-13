"use strict";
let fs = require('fs'),
    qs = require('querystring'),
    config = require('../config'),
    db = require('../dbconnect'),
    getDBRecs =db.getDBRecs,
    setDBRecs = db.setDBRecs,
    rmDBRecs = db.rmDBRecs;

exports.getAction = function (request, response) {
    let docs;
    getDBRecs((error, data) => {
        if (error) {
            docs = JSON.stringify(error.name + " : " + error.message);
        }
        else {
            docs = JSON.stringify(data);
        }
        console.log("DB Response: " + docs);
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(docs);
        response.end();
    });
};

exports.postAction = function (request, response, pathname, postData) {
    let docs;
    postData = qs.parse(postData);
    setDBRecs(postData, function(error, data) {
        if (error) {
            docs = JSON.stringify(error.name + " : " + error.message);
            response.writeHead(503, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({docs: 'Can\'t save data. Please see server\'s console output for details.'}));
        }
        else {
            docs = JSON.stringify(data);
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(postData));
        }
    });
};

exports.deleteAllAction = function (request, response, pathname) {
    let docs;
    let deleteData = qs.parse(request.url.trim().replace(/.*\?/, ''));
    rmDBRecs(deleteData, function(error, data) {
        if (error) {
            docs = JSON.stringify(error.name + " : " + error.message);
            response.writeHead(503, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({docs: 'Can\'t save data. Please see server\'s console output for details.'}));
        }
        else {
            docs = JSON.stringify(data);
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(deleteData));
        }
    });
};
