import { connect } from './mongodb/connect';
import { getFileNameAndNumber } from './utils';
import { csvFileReaderGenerator } from './csv/csvFileReaderGenerator';

const insertCsvToMongo = async (
    csvFileName: string,
    collectionName: string,
    index: any,
) => {
    let connection;

    try {
        connection = await connect();
        const db = await connection.db('mydb');
        const collection = db.collection(collectionName);
        await collection.deleteMany({});
        await collection.createIndex(index);
        let line = 1;
        for (let object of csvFileReaderGenerator(csvFileName)) {
            await collection.insertOne(object);
            console.log(`${line++} inserted.`);
        }
        console.log('\n insertion complete.');
    } catch (e) {
        console.log(e);
    } finally {
        connection.close();
    }
};

const [filaname] = getFileNameAndNumber('./data/fake-1000000.csv', 1);
insertCsvToMongo(filaname, 'users', { birthday: -1, name: 1 });
