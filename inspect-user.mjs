import { MongoClient } from 'mongodb';

const uri = "mongodb://127.0.0.1:27017/strivetechpartners";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('strivetechpartners');
        const collection = db.collection('users');
        const user = await collection.findOne({});
        console.log("User document:", user);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

run();
