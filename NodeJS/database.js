const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const url = 'mongodb+srv://Admin:<password>@democluster-rpx7e.azure.mongodb.net/test?retryWrites=true&w=majority';
exports.database = MongoClient;
exports.ObjectId = ObjectId;
exports.url = url;
exports.assert = assert;

// Connection URL

// Database Name
// const dbName = 'ATWD2';

// Create a new MongoClient

// Use connect method to connect to the Server
// client.connect(function (err) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");

//     const db = client.db("ATWD2");
//     const collection = db.collection("Song");

//     var result = collection.find({}).sort({
//         "artist.name": 1
//     }).skip(0).limit(20).toArray(function (err, docs) {
//         assert.equal(null, err);
//         console.log("Found the following records");
//         console.log(docs)
//         // callback(docs);
//     });
//     console.log(JSON.stringify(result));
//     client.close();
// });
