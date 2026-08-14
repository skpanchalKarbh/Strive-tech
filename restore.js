import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';
import { BSON } from 'bson';

const uri = "mongodb://127.0.0.1:27017/strivetechpartners";
const demoDataDir = path.join(process.cwd(), 'database_mongodb', 'demo_data', 'lumex');

async function restore() {
    console.log("Connecting to MongoDB...");
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('strivetechpartners');
        
        const files = fs.readdirSync(demoDataDir);
        for (const file of files) {
            if (file.endsWith('.bson')) {
                const collectionName = file.replace('.bson', '');
                const filePath = path.join(demoDataDir, file);
                const data = fs.readFileSync(filePath);
                
                if (data.length === 0) continue;

                // Deserialize BSON
                const documents = [];
                let index = 0;
                while (index < data.length) {
                    const docSize = data.readInt32LE(index);
                    const doc = BSON.deserialize(data.subarray(index, index + docSize));
                    documents.push(doc);
                    index += docSize;
                }

                if (documents.length > 0) {
                    const collection = db.collection(collectionName);
                    await collection.deleteMany({});
                    await collection.insertMany(documents);
                    console.log(`Restored ${documents.length} documents to collection ${collectionName}`);
                }
            }
        }
        console.log("Restore complete!");
    } catch (e) {
        console.error("Error restoring data:", e);
    } finally {
        await client.close();
    }
}

restore();
