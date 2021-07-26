import { connect } from '../mongodb/connect';

const makeCollectionTest = async () => {
    let connection;
    try {
        connection = await connect();
        const db = await connection.db('mydb');
        const personsCollection = db.collection('persons');
        const addressCollection = db.collection('addresses');
        console.log(personsCollection, addressCollection);
    } catch (e) {
        console.log(e);
    } finally {
        connection.close();
    }
};

makeCollectionTest();
