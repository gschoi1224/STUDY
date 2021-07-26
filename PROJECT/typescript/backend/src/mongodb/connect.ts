const MongoClient = require('mongodb').MongoClient;

export const connect = (mongoUrl: string = 'mongodb://localhost:27017') =>
    MongoClient.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
