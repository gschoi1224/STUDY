import { connect } from '../mongodb/connect';

const sortTest = async () => {
    let connection;
    try {
        connection = await connect();
        const db = await connection.db('mydb');
        const personsCollection = db.collection('persons');
        await personsCollection.createIndex({ name: 1, age: -1 });
        await personsCollection.deleteMany({});
        await personsCollection.insertMany([
            { name: 'cgs', age: 32 },
            { name: 'cgs', age: 17 },
            { name: 'cgs', age: 25 },
        ]);

        const cursor = personsCollection
            .find({ name: 'cgs' })
            .sort({ age: -1 });
        const result = await cursor.toArray();
        console.log(result);
    } catch (e) {
        console.log(e);
    } finally {
        connection.close();
    }
};
sortTest();
