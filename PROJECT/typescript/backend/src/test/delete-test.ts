import { connect } from '../mongodb/connect';

const deleteTest = async () => {
    let connection, cursor;
    try {
        connection = await connect();
        const db = await connection.db('mydb');
        const personsCollection = db.collection('persons');
        await personsCollection.insertMany([
            { name: 'cgs' },
            { name: 'Tom' },
            { name: 'Brown' },
        ]);
        let result = await personsCollection.deleteOne({ name: 'Tom' });
        console.log(result); // deleteCount : 1
        result = await personsCollection.deleteMany({});
        console.log(result); // deletecount : 3
    } catch (e) {
        console.log(e);
    } finally {
        connection.close();
    }
};

deleteTest();
