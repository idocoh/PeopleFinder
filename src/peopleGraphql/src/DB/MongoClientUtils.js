/**
 * Created by niramsellem on 27.2.2017.
 */
// Retrieve
const MongoClient = require('mongodb').MongoClient;
var mongoDb;
// Connect to the db
function connect () {
    MongoClient.connect("mongodb://localhost:27017/IAFExample", function (err, db) {
        if (!err) {
            console.log("We are connected");
        }
        mongoDb = db;
    });
};

function findInCollection(collectionName, valueToFind){

    var collection = mongoDb.collection(collectionName);
    console.log("before findInCollection");
    let regex = new RegExp(valueToFind);
    console.log("regex: " + regex);
    var queryResult = collection.find({'params.value': regex}).toArray();
    console.log("before findInCollection" + queryResult);
    //queryResult.then((result)=>{console.log(result)});
    return queryResult;
};

module.exports=
{
    connect,
    findInCollection
};