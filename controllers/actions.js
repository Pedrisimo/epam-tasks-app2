"use strict";
let config = require('../routesconfig'),
    db = require('../dbconnect'),
    getDBRecs = db.getDBRecs,
    setDBRecs = db.setDBRecs,
    rmDBRecs = db.rmDBRecs;

exports.getData = function (req, res) {
    getDBRecs(function(err, rows, fields) {
        let resData=[];
    if(err) {
        console.log("Error: " + err.message + ":" + err.code);
    }
    else {
        for(let i = 0; i < rows.length; i++) {
            resData.push(rows[i]);
        }
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(resData));
    }

    });
};

exports.postData = function (req, res, pathname, postData) {
    setDBRecs(postData, function(err, data) {
        let responseData;
        if (err) {
            responseData = err.code + " : " + err.message;
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify({responseData: 'Can\'t save data. Please see server\'s console output for details.'}));
        }
        else {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(data.insertId));
        }
    });
};

exports.rmData = function (req, res, pathname, deleteData) {
    rmDBRecs(deleteData, function(err, data) {
            let responseData;
        if (err) {
            responseData = err.code + " : " + err.message;
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify({responseData: 'Can\'t delete record. Please see server\'s console output for details.'}));
        }
        else {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(data.insertId));
        }
    });
};
