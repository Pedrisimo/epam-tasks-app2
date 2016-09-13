"use strict";
let mongoDB = require('mongodb');
let mongoClient = mongoDB.MongoClient;
let url = 'mongodb://localhost:27017/local';

function getDBRecs(callback) {
     mongoClient.connect(url, function(err, db) {
        if (err) {
            callback(err);
        }
        else {
            let collection = db.collection("persons");
            collection.find().toArray(callback);
            console.log("DB Success");
            db.close();
        }
    });
}

function setDBRecs(insertDoc, callback) {
     mongoClient.connect(url, function(err, db) {
        let docStr = insertDoc;
        if (err) {
            callback(err);
        }
        else {
            let collection = db.collection("persons");
            collection.insertOne(insertDoc, callback);
            console.log("DB Success");
            db.close();
        }
    });
}

function rmDBRecs(rmDoc, callback) {
    let delRec = { "_id": new mongoDB.ObjectID(rmDoc.id) };
     mongoClient.connect(url, function(err, db) {
        if (err) {
            callback(err);
        }
        else {
            let collection = db.collection("persons");
            collection.deleteOne(delRec, callback);
            console.log("DB Success");
            db.close();
        }
    });
}
module.exports = { getDBRecs: getDBRecs, setDBRecs: setDBRecs, rmDBRecs: rmDBRecs };