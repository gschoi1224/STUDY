import { connect } from '../mongodb/connect';

const makeCollectionTest = async () => {
    let connection, cursor;
    try {
        connection = await connect();
        const db = await connection.db('mydb');
        const personsCollection = db.collection('persons');
        const addressCollection = db.collection('addresses');

        cursor = personsCollection.find({ name: 'Leonardo' });
        const foundPersons = await cursor.toArray();
        console.log(foundPersons);

        cursor = addressCollection.find({});
        const foundAddresses = await cursor.toArray();
        console.log(foundAddresses);
    } catch (e) {
        console.log(e);
    } finally {
        connection.close();
    }
};

makeCollectionTest();
