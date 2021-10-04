
const MongoClient = require('mongodb').MongoClient
const env = require('dotenv').config()
const uri = process.env.DB_URL
const dbname = "ultimate_ai"

module.exports.find = (collection, query, cb) => {
    MongoClient.connect(uri, { keepAlive: 1, useUnifiedTopology: true, useNewUrlParser: true, }, function (err, db) {
        if (err) cb(err);
        const dbo = db.db(dbname);
        dbo.collection(collection).find(query).toArray(function (err, result) {
            db.close();
            if (err) cb('Error connecting to the database : ', err);
            return cb(null, result);
        });
    });
}