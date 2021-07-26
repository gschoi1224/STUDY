import { connect } from '../mongodb/connect';

const insertDocumentTest = async () => {
    let connection;
    try {
        connection = await connect();
        const db = await connection.db('mydb');
        const personsCollection = db.collection('persons');
        const addressCollection = db.collection('addresses');

        const person = { name: 'Leonardo', age: 57 };
        let result = await personsCollection.insertOne(person);
        console.log(result);

        const address = { country: 'U.S.A.', city: 'Hollywood' };
        result = await addressCollection.insertOne(address);
        console.log(result);
    } catch (e) {
        console.log(e);
    } finally {
        connection.close();
    }
};

insertDocumentTest();
